'use strict';

const RegisteredCustomer = require('../models/RegisteredCustomer');

class RegisteredCustomerService {

    async list() {
        return  await RegisteredCustomer.query();
    }

    async findById(id) {
        return  await RegisteredCustomer.query().findById(id);
    }

}

module.exports = RegisteredCustomerService;

