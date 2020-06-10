var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:userId', function(req, res, next) {
  res.send("userid:", req.params.userId, " req.user.id:", req.user.id);
});

module.exports = router;
