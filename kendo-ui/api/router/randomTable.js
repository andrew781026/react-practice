'use strict';

const router = require('express').Router();
const errorWrapper = require('../utils/errorWrapper');
const RandomTableService = require('../service/RandomTable');

router.get('/', errorWrapper(async (req, res) => {
    const tableName = req.query.tableName;
    const randomTables = await new RandomTableService().list({tableName});
    res.json(randomTables);
}));


module.exports = router;
