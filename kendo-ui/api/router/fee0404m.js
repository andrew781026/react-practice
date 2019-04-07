'use strict';

const router = require('express').Router();
const errorWrapper = require('../utils/errorWrapper');

router.post('/', errorWrapper(async (req, res) => {

    // 儲存特定月份的更新資料

    const updateData = {

    };

    res.send(chatRoom);
}));

router.get('/', errorWrapper(async (req, res) => {
    const year = req.query.year;
    const month = req.query.month;
    res.send(chatRooms);
}));


module.exports = router;
