var express = require('express');
var router = express.Router();
var path = require('path');
var _ = require('underscore');

// load helpers path
var helper_path = "../../private/js/server/helpers/min/";
// load helpers
var utils = require(helper_path + 'utils-min.js');

var result = {
  msg: null,
  markup: null
};

var js_files = [
  '/js/page/home-min.js'
];

var css_files = [
  '/css/home-min.css'
];

/* GET home page. */
router.get('/', function(req, res, next) {
  loadHomepage(res);
});

// Need to use a helper to get a list of console platforms from the API, then
// use that to create a dropdown.
function loadHomepage(res) {
  modConf = utils.buildModConf("home", null, js_files, css_files, null);
  res.render('partials/home', modConf);
};

module.exports = router;
