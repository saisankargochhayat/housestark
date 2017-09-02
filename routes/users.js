var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');

/* User signup. */
router.post('/signup', function(req, res, next) {
  if(req.body){
    console.log(req.body);
    var newUser = new User({
      name: req.body.name,
      email: req.body.email,
      city: req.body.city,
      password: req.body.password,
      bio: req.body.bio
    });
    newUser.save(function(err, user) {
      if (err) {
        res.status = 502;
        res.send(err);
      } else {
        req.session.user = user.email;
        req.session.name = user.name;
        req.session.points = user.points;
        res.redirect('/');
      }
    });
  }
  else{
    console.log('No data received');
  }
});

/* User login. */
router.post('/login', function(req, res, next) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) {
      res.status = 500;
      res.send(err);
    } else {
      if (user) {
        bcrypt.compare(req.body.password, user.password, function(err, result) {
          if (err) {
            res.status = 500;
            res.send(err);
          } else {
            if (result) {
              req.session.user = user.email;
              req.session.name = user.name;
              req.session.points = user.points;
              res.redirect('/');
            } else {
              res.send("Password doesn't match");
            }
          }
        });
      } else {
        res.status = 200;
        res.send("Email doesn't exist");
      }
    }
  });
});

module.exports = router;