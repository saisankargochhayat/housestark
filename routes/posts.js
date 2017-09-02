var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var Post = require('../models/post');
var multer  = require('multer')
var upload = multer({ dest: 'public/uploads/' })

/* Add new post */
router.post('/newpost', upload.any(), function(req, res, next) {
  if(req.body){
    console.log(req.body);
    var tmp = req.files[0].path.split('/')
    tmp.shift()
    var tmp_path = tmp.join('/');
    console.log(req.session.user);
    var newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      author: mongoose.Types.ObjectId(req.session.userid),
      location: req.body.location,
      image_path: tmp_path,
      tentativeDate: req.body.date
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
  Post.findById(post_id).populate('author').populate('rsvp').exec( function(err, post){
    if(err){
      res.send(err);
    }
    else{
      res.render('post', {post: post});
    }
  });
});

router.post('/rsvp', function(req, res, next) {
  var post_id = req.body.postid;
  Post.findByIdAndUpdate(post_id, {$addToSet:{rsvp: mongoose.Types.ObjectId(req.session.userid)}}, function(err, post){
    if(err){
      res.send(err);
    }
    else{
      res.redirect('/posts/'+post_id)
    }
  });
});

router.get('/:postid/solution', function(req, res, next) {
  var post_id = req.params.postid;
  res.render('submitsolution')
});

module.exports = router;
