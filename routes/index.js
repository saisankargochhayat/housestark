var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('got get req');
  res.sendFile(path.resolve(__dirname + '/../public/tindex.html'));
});

module.exports = router;
