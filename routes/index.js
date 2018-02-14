var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('page d accueil');
	var title = "Redact'Aide";
  	res.render('main', { path : 'index', title: title });
});

	module.exports = router;
