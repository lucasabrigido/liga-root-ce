import UsersTable from '@migrates/users.json';
import DynamoClient from '@common/dynamoClient';
import { UserStatus } from '../../../utils/constants';

class Repository {
    /**
     * @typedef {import('../../../utils/constants')} cfg
     * @param {cfg} cfg
     */
    static config(cfg) {
        return new Repository(
            new DynamoClient(cfg, cfg.stage === 'local'),
            UsersTable.TableName,
            {
                indexByEmail: UsersTable.GlobalSecondaryIndexes[0].IndexName,
                indexByNickname: UsersTable.GlobalSecondaryIndexes[1].IndexName,
            },
        );
    }

    #dc;
    #tableName;
    #indexes;

    async retrieveByEmail(email) {
        const params = {
            TableName: this.#tableName,
            IndexName: this.#indexes.indexByEmail,
            KeyConditionExpression: 'email = :email',
            ExpressionAttributeValues: {
                ':email': email,
            },
            Limit: 1,
        };

        const { Items } = await this.#dc.query(params);

        return Items[0];
    }

    async retrieveByNickname(nickname) {
        const params = {
            TableName: this.#tableName,
            IndexName: this.#indexes.indexByNickname,
            KeyConditionExpression: 'nickname = :nickname',
            ExpressionAttributeValues: {
                ':nickname': nickname,
            },
            Limit: 1,
        };

        const { Items } = await this.#dc.query(params);

        return Items[0];
    }

    async put(item) {
        const putParams = {
            TableName: this.#tableName,
            Item: item,
        };

        await this.#dc.putItem(putParams);

        return item;
    }

    async listAllUsers() {
        const params = {
            TableName: this.#tableName,
            FilterExpression: "#status = :createdStatus",
            ProjectionExpression: "#id, nickname",
            ExpressionAttributeNames: {
                "#status": "status",
                "#id": "id",
            },
            ExpressionAttributeValues: {
                ":createdStatus": UserStatus.Created,
            },
        };

        let allUsers = [];
        let lastEvaluatedKey = null;

        do {
            if (lastEvaluatedKey) {
                params.ExclusiveStartKey = lastEvaluatedKey;
            }

            const result = await this.#dc.scan(params);
            allUsers = allUsers.concat(result.Items || []);
            lastEvaluatedKey = result.LastEvaluatedKey;

        } while (lastEvaluatedKey);

        return allUsers;
    }

    constructor(dc, tableName, indexes) {
        this.#dc = dc;
        this.#tableName = tableName;
        this.#indexes = indexes;
    }
}

export default Repository;