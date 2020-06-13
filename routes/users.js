var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Result = require('../models/result');

/* GET users listing. */
router.get('/:userId', function(req, res, next) {
  var userId = req.params.userId;
  User.findByPk(userId).then(user => {
    if(!user) res.send("ごめんね。ユーザーが見つからなかったよ");
    else{
      Result.findByPk(userId).then(result=>{
        if(!result) res.send("ごめんね。対戦成績が見つからなかったよ");
        else res.render('user', {user: user, result: result, url: req.url});
      })
    }
  })
});

router.get('/:userId/edit', function(req, res, next) {
  var userId = req.params.userId;
  User.findByPk(userId).then(user => {
    if(!user) res.send("ごめんね。ユーザーが見つからなかったよ");
    else{
      if(user.userTwitterId != req.user.id.toString()){
        res.send("権限がありません");
      }else res.render('edit', {user: user});
    }
  })
});

router.post('/:userId', (req, res) => {
  var userId = req.params.userId;
  User.findByPk(userId).then(user => {
    if(!user) res.send("ごめんね。ユーザーが見つからなかったよ");
    else{
      if(user.userTwitterId != req.user.id.toString()){
        res.send("権限がありません");
      }else {
        const newName = req.body.name; //newnameに変更してupdate
        user.username = newName;
        User.update(user).then(() => {
          res.redirect('/users/' + userId);
        })
      }
    }
  })
})
module.exports = router;
