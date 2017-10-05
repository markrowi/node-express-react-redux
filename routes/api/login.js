var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../../middleware/Users')
/* Api's. */

router.get('/', function(req,res, next){
    var {user} = req;
    if(!!user){
         var auth = {
            name:user.name,
            username:user.username
        };
        //  console.lg(auth.validPassword())
    }
   
  res.send({message:'get', messages:req.flash(), 'isLogged':!!user, user:(!!user?auth:null)})
});

router.post('/', passport.authenticate('local', 
                { 
                    successRedirect: '/api/login',
                    failureRedirect: '/api/login',
                    failureFlash: true
                })
            );



module.exports = router;
