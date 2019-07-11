'use strict';

const Model = require('objection').Model;

class RegisteredCustomer extends Model {

    static get tableName() {
        return 'registeredCustomer';
    }

}

module.exports = RegisteredCustomer;
