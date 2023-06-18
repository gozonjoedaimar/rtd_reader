var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');
var session = require('express-session');
var querystring = require('querystring');

var app = express();

// local require
globalThis.local_require = function(local_path) {
  return require(path.join(__dirname, local_path));
}

// debug
globalThis.__debug = function(namespace) {
  return require('debug')(process.env.APP_NAME+':'+namespace);
}

// config loader
globalThis.__config = require('./app/config');

// db resource
var mongodbConnect = require('./resources/db/connect');

// routes
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');

// middleware
const auth = require('./app/middlewares/auth');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session
app.use(session({
  secret: 'some orange bunny',
  resave: false,
  saveUninitialized: true
}))
app.use(flash());

const mongoose = mongodbConnect.init();

/** Route utils */
app.use(function(req, res, next) {
  req.__appdir = __dirname;
  req.__docdir = '/build/html/';
  req.__public = '/public/';
  next();
})

// models
app.use(function(req, res, next) {
  let models = {
    user: require(path.join(__dirname,'app/models/User'))
  }
  req.__model = models;
  next();
})

// manage auth
app.use(auth.check());

/** load tailwind */
app.get('/vendor.css', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'resources/css/vendor.css'));
});

app.use('/',indexRouter);
app.use('/login',loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  // res.locals.env = { dev: true }

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
