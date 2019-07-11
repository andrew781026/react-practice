'use strict';

const ChargeSp = require('../models/ChargeSp');

class RandomTableService {

    async list({knex = ChargeSp.knex(), tableName = 'chargeSp'}) {
        // limit 100 , 代表只取 100 筆資料
        return await knex.select().table(tableName).limit(100);
        //  return await ChargeSp.query().limit(100);
    }

}

module.exports = RandomTableService;

