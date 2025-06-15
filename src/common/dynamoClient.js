import {
    DynamoDBClient,
} from '@aws-sdk/client-dynamodb';
import {
    BatchGetCommand,
    BatchWriteCommand,
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    QueryCommand,
    ScanCommand,
    UpdateCommand,
} from '@aws-sdk/lib-dynamodb';

const _module = 'dynamodb';

const marshallOptions = {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
};

const unmarshallOptions = {
    wrapNumbers: false,
};

const translateConfig = {marshallOptions, unmarshallOptions};

async function execute(dynamoClient, funct, fname, ...params) {
    const debug = dynamoClient._debug;
    let result;
    let hasError = false;

    if (debug) {
        console.log(JSON.stringify({function: fname, module: _module, params}, null, 2));
    }

    try {
        result = await funct();
        return result;
    } catch (e) {
        result = e;
        hasError = true;
        throw e;
    } finally {
        if (debug || hasError) {
            console.log(JSON.stringify({function: fname, module: _module, result}, null, 2));
        }
    }
}

export default class DynamoClient {
    get _dc() {
        return this.dc;
    }

    get _debug() {
        return this.debug;
    }

    constructor(cfg, debug = false) {
        if (debug) {
            console.log(JSON.stringify({message: 'Dynamo config', cfg: cfg}, null, 2));
        }

        this.dc = DynamoDBDocumentClient.from(new DynamoDBClient({
            region: cfg.region,
            credentials: {
                accessKeyId: cfg.accessKey,
                secretAccessKey: cfg.secretKey,
            },
            endpoint: cfg.stage === 'local' ? cfg.dynamoEndpoint : undefined,
        }), translateConfig);
    }

    putItem(params) {
        return execute(this, () => this.dc.send(new PutCommand(params)), 'putItem', params);
    }

    getItem(params) {
        return execute(this, () => this.dc.send(new GetCommand(params)), 'getItem', params);
    }

    updateItem(params) {
        return execute(this, () => this.dc.send(new UpdateCommand(params)), 'updateItem', params);
    }

    deleteItem(params) {
        return execute(this, () => this.dc.send(new DeleteCommand(params)), 'deleteItem', params);
    }

    query(params) {
        return execute(this, () => this.dc.send(new QueryCommand(params)), 'query', params);
    }

    scan(params) {
        return execute(this, () => this.dc.send(new ScanCommand(params)), 'scan', params);
    }

    batchGetItem(params) {
        return execute(this, () => this.dc.send(new BatchGetCommand(params)), 'batchGetItem', params);
    }

    batchWriteItem(params) {
        return execute(this, () => this.dc.send(new BatchWriteCommand(params)), 'batchWriteItem', params);
    }
}