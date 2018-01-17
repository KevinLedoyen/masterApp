var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan'); // 
var cookieParser = require('cookie-parser'); // https://www.npmjs.com/package/cookie-parser
var session = require('express-session') // https://github.com/expressjs/session
var bodyParser = require('body-parser'); // récupération des requêtes de type POST

/* LISTE des fichiers routes + controller */
var index = require('./routes/index');
var test = require('./routes/test');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
app.use(logger('combined', {stream: accessLogStream}))

app.use('/', index);
app.use('/test', test);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	console.log('callback 2');
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	console.log('callback 2');
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
