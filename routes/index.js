var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
