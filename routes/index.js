var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('page d accueil');
	var title = "Redact'Aide";
	var css_files = ['style.css', 'hoverable.css', 'color.css', 'home.css']; // rajouter des fichiers css
	var js_files = ['app.js']; // rajouter des fichiers js
	res.render('main', { path : 'index', css_files: css_files, js_files:js_files, title: title});
	// res.render('main', { path : 'index', title: title });
});

module.exports = router;