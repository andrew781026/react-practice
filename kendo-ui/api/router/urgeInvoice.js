'use strict';

const router = require('express').Router();
const errorWrapper = require('../utils/errorWrapper');
const UrgeInvoiceService = require('../service/UrgeInvoice');

router.get('/', errorWrapper(async (req, res) => {
    const urgeInvoices = await new UrgeInvoiceService().list();
    res.json(urgeInvoices);
}));




module.exports = router;
