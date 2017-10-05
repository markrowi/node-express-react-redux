var express = require('express');
var router = express.Router();


// ROUTES 
router.use('/login', require('./api/login'))

router.get('/logout', function (req, res) {
  req.logout();
  res.send({
    'success': true
  });
});

module.exports = router;