var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  	console.log('page d accueil');
  	var title = "Redact'Aide";
  	var css_files = ['style.css', 'hoverable.css', 'color.css', 'users/main.css']; // rajouter des fichiers css
  	var jss_files = ['app.js']; // rajouter des fichiers css
    	res.render('main', { path : 'users/login', css_files: css_files, jss_files:jss_files, title: title});
});

router.get('/logout', function(req, res, next) {
		console.log('page d accueil');
		var title = "Redact'Aide";
		var css_files = ['style.css', 'hoverable.css', 'color.css', 'users/main.css']; // rajouter des fichiers css
		var jss_files = ['app.js']; // rajouter des fichiers css
	  	res.render('main', { path : 'users/logout', css_files: css_files, jss_files:jss_files, title: title});
});

module.exports = router;
