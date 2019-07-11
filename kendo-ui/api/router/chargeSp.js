'use strict';

const router = require('express').Router();
const errorWrapper = require('../utils/errorWrapper');
const ChargeSpService = require('../service/ChargeSp');

router.get('/', errorWrapper(async (req, res) => {
    const chargeSps = await new ChargeSpService().list();
    res.json(chargeSps);
}));




module.exports = router;
