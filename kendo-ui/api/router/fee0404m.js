'use strict';

const router = require('express').Router();
const errorWrapper = require('../utils/errorWrapper');

router.get('/', errorWrapper(async (req, res) => {

    const err = {
        title: 'error',
        message: '有錯誤',
    };

    const year = req.query.year;
    const month = req.query.month;
    if (!year) throw err;
    res.send(req.query);
}));

router.post('/', errorWrapper(async (req, res) => {

    const err = {
        title: 'error403',
        message: '403找不到東西',
    };

    res.status(403).json(err);
}));

router.put('/', errorWrapper(async (req, res) => {

    const err = {
        title: 'error404',
        message: '404沒有此URL',
    };

    res.status(404).json(err);
}));

router.patch('/', errorWrapper(async (req, res) => {

    const json = {
        title: 'good 200',
        message: '200正確',
    };

    console.log('in patch !!!');

    res.status(200).json(json);
}));

router.delete('/', errorWrapper(async (req, res) => {

    const json = {
        title: 'error204',
        message: '204正確',
    };

    console.log('in delete !!!');

    res.status(311).json(json);
}));


module.exports = router;
