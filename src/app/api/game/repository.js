import Table from '@migrates/games.json';
import DynamoClient from '@common/dynamoClient';
import { GameStatus } from '../../../utils/constants';

class Repository {
    /**
     * @typedef {import('../../../utils/constants')} cfg
     * @param {cfg} cfg
     */
    static config(cfg) {
        return new Repository(
            new DynamoClient(cfg, cfg.stage === 'local'),
            Table.TableName,
        );
    }

    #dc;
    #tableName;

    async put(item) {
        const putParams = {
            TableName: this.#tableName,
            Item: item,
        };

        await this.#dc.putItem(putParams);

        return item;
    }

    async listAllGames() {
        const params = {
            TableName: this.#tableName,
            FilterExpression: "#status = :createdStatus",
            ExpressionAttributeNames: {
                "#status": "status",
            },
            ExpressionAttributeValues: {
                ":createdStatus": GameStatus.Approved,
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

    constructor(dc, tableName) {
        this.#dc = dc;
        this.#tableName = tableName;
    }
}

export default Repository;