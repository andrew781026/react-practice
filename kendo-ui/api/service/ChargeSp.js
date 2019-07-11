'use strict';

const ChargeSp = require('../models/ChargeSp');

class InvoiceMasterService {

    async list() {
        // limit 100 , 代表只取 100 筆資料
        return  await ChargeSp.query().limit(100);
    }

    async findById(id) {
        return  await ChargeSp.query().findById(id);
    }

}

module.exports = InvoiceMasterService;

