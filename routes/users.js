var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Result = require('../models/result');
const loader = require('../models/sequelize-loader');

router.get('/', (req, res, next) => {
  
  loader.database.query("SELECT * FROM users JOIN results ON 'userId' = 'userId'").then(([result, metadata])=>{
    console.log(result);
    res.send(result);
  })
})

/* GET users listing. */
router.get('/:userId', function(req, res, next) {
  var userId = req.params.userId;
  User.findByPk(userId).then(user => {
    if(!user) res.send("ごめんね。ユーザーが見つからなかったよ");
    else{
      Result.findByPk(userId).then(result=>{
        if(!result) res.send("ごめんね。対戦成績が見つからなかったよ");
        else {
          if(req.isAuthenticated()) res.render('user', {user: req.user, username: user.username , userId: user.userId, result: result, url: req.url, yours: (req.user.id.toString() === user.userTwitterId)});
          else res.render('user', {username: user.username , userId: user.userId, result: result, url: req.url, yours: false});
        }
      })
    }
  })
});

//edit画面へ移動
router.get('/:userId/edit', function(req, res, next) {
  var userId = req.params.userId;
  if(!req.isAuthenticated()){
    res.send("先にログインしてください");
  }else{
    User.findByPk(userId).then(user => {
      if(!user) res.send("ごめんね。ユーザーが見つからなかったよ");
      else{
        if(user.userTwitterId != req.user.id.toString()){
          res.send("権限がありません");
        }else res.render('edit', {user: user});
      }
    })
  }
});

//ユーザー情報の変更。現在は名前だけ
router.post('/:userId/edit1', (req, res) => {
  console.log("ユーザー情報の変更");
  var userId = req.params.userId;
  if(!req.isAuthenticated()){
    res.send("先にログインしてください");
  }else if(!req.body.name){
    res.send("無効な入力です");
  }else {
    User.findByPk(userId).then(user => {
      if(!user) res.send("ごめんね。ユーザーが見つからなかったよ。");
      else{
        console.log("user Found");
        if(user.userTwitterId != req.user.id.toString()){
          res.send("権限がありません");
        }else {
          console.log("updateします");
          User.update({ username: req.body.name }, { where: {userTwitterId: req.user.id.toString()} }).then(()=>{
            console.log("変更! id:" + userId + "のユーザーネームを" + req.body.name)
            res.redirect('/users/' + userId);
          });
        }
      }
    });
  }
})
module.exports = router;
