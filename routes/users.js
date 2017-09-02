var express = require('express');
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
        req.session.points = user.points;
        res.redirect('/');
      }
    });
  }
  else{
    console.log('No data received');
  }
});

module.exports = router;
