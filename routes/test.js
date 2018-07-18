var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// res.end('test');
  res.render('main', { title: 'titre à /bla de test.js', path : 'index'}); // path est le nom du template à inclure
});

router.get('/bla', function(req, res, next) {
  res.render('main', { title: 'titre à /bla de test.js', path : 'index'}); // path est le nom du template à inclure
});

module.exports = router;
