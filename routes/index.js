var express = require('express');
var router = express.Router();
const User = require('../models/user');
/* GET home page. */
router.get('/', function(req, res, next) {
  var roomMemberNumArray = new Array(10);
  for (let roomId = 1; roomId <= 10; roomId++) {
    roomMemberNumArray[roomId-1] = {roomName: roomId.toString(), number: countPeople[roomId.toString()]};
  }
  if(req.user){
    User.findOne({
      where: {usertwitterid: req.user.id.toString()}
    }).then( (user) =>{
      res.render('index', {user: user, roomMemberNumArray: roomMemberNumArray});
      //res.render('index', {user: user});
    })
  }else{
      res.render('index', {roomMemberNumArray: roomMemberNumArray});
  }
  
});

router.post('/moveToRoom', (req, res, next) => {
  //logにユーザーのtwitterIdを表示する
  console.log("部屋"+ req.body.key + "に移動");
  if(!req.body.key) res.send("原因は不明ですが失敗しました。ごめんなさい><");
  var key = req.body.key;
  if(key.length != 4) res.send("入力の長さが足りないようです");
  if(!key.match(/\d{4}/)) res.send("入力は4桁の数字でお願いします");
  res.redirect('/janken/' + key);
})

module.exports = router;
