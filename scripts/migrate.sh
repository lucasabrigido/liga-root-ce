#!/bin/bash
set -euo pipefail

PROFILE=""
STAGE="local"

while [[ $# -gt 0 ]]; do
  case $1 in
    --profile)
      PROFILE="$2"
      shift 2
      ;;
    --stage)
      STAGE="$2"
      shift 2
      ;;
    *)
      echo "Parâmetro desconhecido: $1"
      exit 1
      ;;
  esac
done

echo "Rodando migrate com profile='${PROFILE:-default}' e stage='$STAGE'"

if [[ "$STAGE" == "local" ]]; then
  DYNAMO_ENDPOINT="http://localhost:8000"
  REGION="us-east-1"
  export AWS_ACCESS_KEY_ID="fakeMyKeyId"
  export AWS_SECRET_ACCESS_KEY="fakeSecretAccessKey"
else
  DYNAMO_ENDPOINT=""
  REGION="us-east-1"
fi

if [[ -n "$PROFILE" ]]; then
  PROFILE_ARG="--profile $PROFILE"
else
  PROFILE_ARG=""
fi

TABLE_DIR="$PWD/migrates"

echo "Criando ou atualizando tabelas..."

for file in "$TABLE_DIR"/*.json; do
  tableName=$(jq -r '.TableName' "$file")
  echo "Processando tabela '$tableName'..."

  if aws dynamodb describe-table --table-name "$tableName" \
      ${DYNAMO_ENDPOINT:+--endpoint-url "$DYNAMO_ENDPOINT"} \
      --region "$REGION" $PROFILE_ARG > /dev/null 2>&1; then

    echo "Tabela '$tableName' existe, verificando GSIs..."

    existingGSIs=$(aws dynamodb describe-table --table-name "$tableName" \
      ${DYNAMO_ENDPOINT:+--endpoint-url "$DYNAMO_ENDPOINT"} --region "$REGION" $PROFILE_ARG | jq -r '.Table.GlobalSecondaryIndexes[].IndexName' || echo "")

    gsisJson=$(jq -c '.GlobalSecondaryIndexes // []' "$file")
    gsisJsonNames=$(echo "$gsisJson" | jq -r '.[].IndexName')

    # Apaga GSIs que não existem mais no JSON
    for gsi in $existingGSIs; do
      if ! grep -qx "$gsi" <<< "$gsisJsonNames"; then
        echo "Apagando GSI '$gsi' que não existe mais no JSON..."
        aws dynamodb update-table --table-name "$tableName" \
          --global-secondary-index-updates "[{\"Delete\": {\"IndexName\": \"$gsi\"}}]" \
          ${DYNAMO_ENDPOINT:+--endpoint-url "$DYNAMO_ENDPOINT"} --region "$REGION" $PROFILE_ARG
      fi
    done

    # Pega o array completo de AttributeDefinitions do JSON (para passar no update)
    attributeDefinitions=$(jq -c '.AttributeDefinitions' "$file")

    # Cria GSIs do JSON que não existem
    for gsiJson in $(echo "$gsisJson" | jq -c '.[]'); do
      gsiName=$(echo "$gsiJson" | jq -r '.IndexName')

      if ! grep -qx "$gsiName" <<< "$existingGSIs"; then
        echo "Criando GSI '$gsiName'..."

        aws dynamodb update-table --table-name "$tableName" \
          --attribute-definitions "$attributeDefinitions" \
          --global-secondary-index-updates "[{\"Create\": $gsiJson}]" \
          ${DYNAMO_ENDPOINT:+--endpoint-url "$DYNAMO_ENDPOINT"} --region "$REGION" $PROFILE_ARG

      else
        echo "GSI '$gsiName' já existe, ignorando atualização (não suportado)"
      fi
    done

  else
    echo "Tabela '$tableName' não existe, criando..."
    aws dynamodb create-table --cli-input-json file://"$file" \
      ${DYNAMO_ENDPOINT:+--endpoint-url "$DYNAMO_ENDPOINT"} --region "$REGION" $PROFILE_ARG
  fi

done

echo "Processo concluído!"
