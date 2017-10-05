var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

 var db = req.db;
var users = db.get('users');
  users.find({},{},function(e,docs){
    console.log(docs)
  })
  res.send(users);
});

module.exports = router;
