// rode o docker-compose e chame o script de migrate


// .env

NEXT_STAGE="dev"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
DYNAMO_ENDPOINT="http://localhost:8000"
REGION="us-east-1"
AWS_ACCESS_KEY_ID="fakeMyKeyId"
AWS_SECRET_ACCESS_KEY="fakeSecretAccessKey"

//curl http://localhost:8000/
// npx dynamodb-gui -p 8001