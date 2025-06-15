import Table from '@migrates/tokens.json';
import DynamoClient from '@common/dynamoClient';

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


    constructor(dc, tableName, indexes) {
        this.#dc = dc;
        this.#tableName = tableName;
    }
}

export default Repository;