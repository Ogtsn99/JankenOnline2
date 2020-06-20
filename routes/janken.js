var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Result = require('../models/result');

router.get('/:roomId', (req, res) => {
    var roomId = req.params.roomId;
    if(!req.isAuthenticated()){
        res.send("先にログインをお願いします")
    }else if(roomId.length >= 5) {
        res.send("部屋がありませんでした");
        res.end();
    }else{
        var userId = req.user.id;
        User.findOne({
                where: {userTwitterId: userId}
            }
        ).then((user) => {
            var username = user.username;
            var sz = countPeople[roomId];
            if(typeof(sz) === 'undefined') sz = 0;
            if(sz === 1){
                if(roomMember[roomId][0].userId === userId){
                    res.send("部屋に入れませんでした。")
                }else{
                    //roomMember[roomId][sz] = {userId: userId, username: username, socketId: null};
                    res.render('janken', {roomId: roomId, username: username, userId: userId, user: user});
                }
            }else if(sz === 0){
                roomMember[roomId][0] = {userId: null, username: null, socketId: null};
                roomMember[roomId][1] = {userId: null, username: null, socketId: null};
                res.render('janken', {roomId: roomId, username: username, userId: userId, user: user});
            }else{
                res.send("部屋に入れませんでした。人数がいっぱい、もしくは更新中です。")
            }
        })
    }
});
module.exports = router;