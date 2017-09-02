var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('got get req');
  res.sendFile(path.resolve(__dirname + '/../public/tindex.html'));
});

router.get('/login',function(req,res){
	res.sendFile(path.join(__dirname,'../login.html'));
})

router.get('/logout',function(req,res){
	req.session.destroy();
	res.sendFile(path.join(__dirname,'../logout.html'));
})

router.get('/signup',function(req,res){
	res.sendFile(path.join(__dirname,'../signup.html'));
})

module.exports = router;
