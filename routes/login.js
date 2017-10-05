var express = require('express');
var passport = require('passport')
var router = express.Router();
var sess = require('../middleware/session')
/* GET home page. */

router.get('/', function(req, res, next) {

  res.render('login', {messages:req.flash(), title:'Login'});
});


router.post('/',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);



module.exports = router;
