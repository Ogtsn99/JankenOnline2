var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Result = require('../models/result');

router.get('/:roomId', (req, res) => {
    var roomId = req.params.roomId;
    /* 
        TODO 同じルームに同じユーザーがいるのは弾く
    */
    if(roomId.length >= 5) {
        res.send("部屋がありませんでした");
        res.end();
    }else{

        console.log(roomId + "への接続を試みました");
        //変更が必要
        userId = Math.random().toString(32).substring(2);
    //    userId = req.user.id; if(!userId) res.send("先にログインをお願いします");
        var sz = countPeople[roomId];
        if(typeof(sz) === 'undefined') sz = 0;
        if(sz <= 1){
            console.log("接続できたよ!");
            countPeople[roomId]++;
            roomMember[roomId][sz] = userId;
            res.render('janken', {roomId: roomId});
        }else{
            res.send("部屋に入れませんでした。おそらく人数がいっぱいです。")
        }
    }
});
/*
global.numToJanken = {0: "グー", 1: "チョキ", 2: "パー"};
global.te = {}; //userId: ユーザーの次の手
global.countPeople = {}; //roomId: ルームにいるユーザーの数
global.roomMember = {}; //roomId: ルームにいるユーザー1のID, ユーザー2のID
global.userResult = {}; //userId: 勝ち, あいこ, 負け, gu, choki, pa
*/
module.exports = router;