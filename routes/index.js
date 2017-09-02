var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    res.render('issues');
  }
  else {
    res.sendFile(path.resolve(__dirname + '/../public/index.html'));
  }
});

router.get('/login',function(req,res){
  res.sendFile(path.resolve(__dirname + '/../public/login.html'));
})

router.get('/logout',function(req,res){
	req.session.destroy();
  res.sendFile(path.resolve(__dirname + '/../public/logout.html'));
})

router.get('/signup',function(req,res){
  res.sendFile(path.resolve(__dirname + '/../public/signup.html'));
})

module.exports = router;
