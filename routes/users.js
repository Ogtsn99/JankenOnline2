var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Result = require('../models/result');

/* GET users listing. */
router.get('/:userId', function(req, res, next) {
  var userId = req.params.userId.slice(1);
  User.findByPk(userId).then(user => {
    if(!user) res.send("ごめんね。ユーザーが見つからなかったよ");
    else{
      Result.findByPk(userId).then(result=>{
        res.render('user', {user: user, result: result});
      })
    }
  })
  //res.send("userid:" + req.params.userId + " req.user.id:" + req.user.id);
});

module.exports = router;
