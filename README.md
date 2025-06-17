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

//aws s3api put-public-access-block \
  --bucket my-app-assets-root-boardgame-cdn \
  --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false" \
  --region us-east-1 \
  --profile root-dev
