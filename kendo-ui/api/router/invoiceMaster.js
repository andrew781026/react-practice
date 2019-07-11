'use strict';

const router = require('express').Router();
const errorWrapper = require('../utils/errorWrapper');
const InvoiceMasterService = require('../service/InvoiceMaster');

router.get('/', errorWrapper(async (req, res) => {
    const invoiceMasters = await new InvoiceMasterService().list();
    res.json(invoiceMasters);
}));




module.exports = router;
