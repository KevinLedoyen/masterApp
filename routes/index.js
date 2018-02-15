var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('page d accueil');
	var title = "Redact'Aide";
	var css_files = ['style.css', 'color.css', 'home.css']; // rajouter des fichiers css
	var jss_files = ['app.js']; // rajouter des fichiers css
  	res.render('main', { path : 'index', css_files: css_files, jss_files:jss_files, title: title});
  	// res.render('main', { path : 'index', title: title });
});

module.exports = router;
