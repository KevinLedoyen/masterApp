var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  	console.log('page login');
  	var title = "Redact'Aide";
  	var css_files = ['style.css', 'hoverable.css', 'color.css', 'users/main.css']; // rajouter des fichiers css
  	var js_files = ['app.js', 'users/login.js']; // rajouter des fichiers js
    	res.render('main', { path : 'users/login', css_files: css_files, js_files:js_files, title: title});
});

router.get('/logout', function(req, res, next) {
		console.log('page logout');
		var title = "Redact'Aide";
		var css_files = ['style.css', 'hoverable.css', 'color.css', 'users/main.css']; // rajouter des fichiers css
		var js_files = ['app.js', 'users/logout.js']; // rajouter des fichiers js
	  	res.render('main', { path : 'users/logout', css_files: css_files, js_files:js_files, title: title});
});

router.get('/redaction', function(req, res, next) {
		console.log('page editeur');
		var title = "Redact'Aide";
		var css_files = ['style.css', 'hoverable.css', 'color.css', 'users/main.css']; // rajouter des fichiers css
		var js_files = ['app.js']; // rajouter des fichiers js
		var js_head_files = ['editeur.js']; // rajouter des fichiers js
	  	res.render('userBackoffice', { path : 'users/editeur', css_files: css_files, js_files:js_files, js_head_files:js_head_files, title: title});
});


module.exports = router;
