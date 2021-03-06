var express = require('express');
var router = express.Router();
var path = require('path');
var Post = require('../models/post');
var User = require('../models/user');
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    Post.find({}).populate('author').populate('rsvp').exec( function(err, posts){
      if(err){
        res.send(err);
      }
      else{
        User.find({},['name', 'city', 'points'],{sort:{points:-1}}, function(error, users){
          if(error){
            res.send(err);
          }
          else{
            cities = {
              'Bhubaneswar': 0,
              'Mumbai': 0,
              'Delhi': 0,
              'Kolkata': 0
            }
            for(let i=0;i<users.length;i++){
              cities[users[i].city]+=users[i].points;
            }
            // Create items array
            var items = Object.keys(cities).map(function(key) {
                return [key, cities[key]];
            });

            // Sort the array based on the second element
            items.sort(function(first, second) {
                return second[1] - first[1];
            });
            res.render('dashboard', {posts: posts, user: {name:req.session.name, points:req.session.points}, users: users, city:items.slice(0,4)})
          }
        })
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
