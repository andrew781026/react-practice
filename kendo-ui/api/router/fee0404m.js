'use strict';

const router = require('express').Router();
const errorWrapper = require('../utils/errorWrapper');

router.post('/', errorWrapper(async (req, res) => {
    const chatRoom = await new ChatRoomService().add(req.body);
    res.send(chatRoom);
}));

router.get('/', errorWrapper(async (req, res) => {
    const year = req.query.year;
    const month = req.query.month;
    res.send(chatRooms);
}));

router.put('/:id', errorWrapper(async (req, res) => {
    const chatRoom = await new ChatRoomService().update({id: req.params.id, chatRoom: req.body});
    res.send(chatRoom);
}));

router.delete('/:id', errorWrapper(async (req, res) => {
    const result = await new ChatRoomService().deleteById(req.params.id);
    console.log('result=', result);
    res.send({result: result, msg: 'delete success'});
}));

module.exports = router;
