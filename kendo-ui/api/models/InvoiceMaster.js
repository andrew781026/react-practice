'use strict';

const Model = require('objection').Model;

class InvoiceMaster extends Model {

    static get tableName() {
        return 'invoiceMaster';
    }

}

module.exports = InvoiceMaster;
