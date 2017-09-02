var express = require('express');
var router = express.Router();
var path = require('path');
var Post = require('../models/post');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    Post.find({}, function(err,posts){
      if(err){
        res.send(err);
      }
      else{
        res.render('dashboard', {posts: posts})
      }
    });
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

router.get('/newpost',function(req,res){
  if(req.session.user){
    res.render('addpost')
  }
  else {
    res.render('index')
  }
})

module.exports = router;
