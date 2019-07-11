'use strict';

const InvoiceMaster = require('../models/InvoiceMaster');

class InvoiceMasterService {

    async list() {
        // limit 100 , 代表只取 100 筆資料
        return  await InvoiceMaster.query().limit(100);
    }

    async findById(id) {
        return  await InvoiceMaster.query().findById(id);
    }

}

module.exports = InvoiceMasterService;

