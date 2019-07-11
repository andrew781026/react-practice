'use strict';

const UrgeInvoice = require('../models/UrgeInvoice');

class UrgeInvoiceService {

    async list() {
        // limit 100 , 代表只取 100 筆資料
        return  await UrgeInvoice.query().limit(100);
    }

    async findById(id) {
        return  await UrgeInvoice.query().findById(id);
    }

}

module.exports = UrgeInvoiceService;

