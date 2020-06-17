var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Result = require('../models/result');

router.get('/:roomId', (req, res) => {
    console.log("roomId is " + req.params.roomId)
    res.render('janken', {user: req.user, roomId: req.params.roomId});
});

module.exports = router;