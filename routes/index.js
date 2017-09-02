var express = require('express');
var router = express.Router();
var path = require('path');
var Post = require('../models/post');
var User = require('../models/user');
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

// router.get('/profile', function(req, res, next) {
//   if(req.session.user){
//     res.render('profile')
//   }
//   else {
//     res.redirect('/')
//   }
// });

router.get('/login',function(req,res){
  if(req.session.user){
    res.redirect('/')
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
    res.redirect('/')
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
    res.redirect('/')
  }
})

router.get('/profile', function(req, res, next) {
  var user_id = req.session.userid;
  console.log(req.session.userid);
  User.findById(user_id, function(err, user){
    if(err){
      res.send(err);
    }
    else{
      res.render('profile', {user: user});
    }
  });
});

module.exports = router;
