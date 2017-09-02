var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var Post = require('../models/post');

/* Add new post */
router.post('/newpost', function(req, res, next) {
  if(req.body){
    console.log(req.body);
    var newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      author: req.session.name,
      location: req.body.location
    });
    newPost.save(function(err, post) {
      if (err) {
        res.status = 502;
        res.send(err);
      } else {
        res.redirect('/posts/' + post._id);
      }
    });
  }
  else{
    console.log('No data received');
  }
});

router.get('/:postid', function(req, res, next) {
  var post_id = req.params.postid;
  Post.findById(post_id, function(err, post){
    if(err){
      res.send(err);
    }
    else{
      res.render('post', {post: post});
    }
  });
});

module.exports = router;
