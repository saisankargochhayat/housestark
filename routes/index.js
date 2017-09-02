var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    res.render('dashboard')
  }
  else {
    res.render('index')
  }
});

router.get('/profile', function(req, res, next) {
  if(req.session.user){
    res.render('profile')
  }
  else {
    res.render('index')
  }
});

router.get('/login',function(req,res){
  if(req.session.user){
    res.render('dashboard')
  }
  else {
    res.render('login')
  }
})

router.get('/logout',function(req,res){
	req.session.destroy();
  res.render('logout')
})

router.get('/signup',function(req,res){
  if(req.session.user){
    res.render('dashboard')
  }
  else {
    res.render('signup')
  }
})

module.exports = router;
