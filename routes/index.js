var express = require('express');
var router = express.Router();
const User = require('../models/user');
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.user){
    User.findOne({
      where: {userTwitterId: req.user.id.toString()}
    }).then( (user) =>{
      //res.render('index', { title: 'Express', user: req.user, userId: userdata.userId});
      res.render('index', { title: 'Express', user: user});
    })
  }else{
      res.render('index', { title: 'Express'});
  }
});

module.exports = router;
