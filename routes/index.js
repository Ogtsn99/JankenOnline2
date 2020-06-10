var express = require('express');
var router = express.Router();
const User = require('../models/user');
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.user){
    User.findOne({
      where: {userTwitterId: req.user.id.toString()}
    }).then( (userdata) =>{
      res.render('index', { title: 'Express', user: req.user, userId: userdata.userId});
    })
  }else{
      res.render('index', { title: 'Express'});
  }
  
});

module.exports = router;
