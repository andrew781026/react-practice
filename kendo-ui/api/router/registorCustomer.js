'use strict';

const router = require('express').Router();
const errorWrapper = require('../utils/errorWrapper');
const RegisteredCustomerService = require('../service/RegisteredCustomer');

router.get('/', errorWrapper(async (req, res) => {
    const registeredCustomers = await new RegisteredCustomerService().list();
    res.json(registeredCustomers);
}));




module.exports = router;
