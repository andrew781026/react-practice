'use strict';

const Model = require('objection').Model;

class InvoiceMaster extends Model {

    static get tableName() {
        return 'urgeInvoice';
    }

}

module.exports = InvoiceMaster;
