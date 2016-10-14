var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    hbs = require('hbs'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Defines where we can load in partials from for 
// Handlebars
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('debug', function(optionaValue) {
  console.log("Current Context");
  console.log("====================");
  console.log(this);

  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    console.log(optionalValue);
  }
});

// Route Set UP
// Define route files
var home = require('./routes/min/home-min');

// Then set them to the url path
app.use('/', home);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    var helper_path = "./private/js/server/helpers/min/",
        utils = require(helper_path + 'utils-min.js');

    var js_files = [];

    var css_files = [];

    modConf = utils.buildModConf("404", null, js_files, css_files, null);
    res.render('404', modConf);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
    var helper_path = "./private/js/server/helpers/min/",
        utils = require(helper_path + 'utils-min.js');

    var js_files = [];

    var css_files = [];

    modConf = utils.buildModConf("404", null, js_files, css_files, null);
    res.render('404', modConf);
});


module.exports = app;
