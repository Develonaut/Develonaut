var express = require('express');
var router = express.Router();
var path = require('path');
var _ = require('underscore');
var async = require('async');

// load helpers path
var helper_path = "../../private/js/server/helpers/min/";
// load helpers
var behance_api_helpers = require(helper_path + 'behance_api_helpers-min.js');
var github_api_helpers = require(helper_path + 'github_api_helpers-min.js');
var tumblr_api_helpers = require(helper_path + 'tumblr_api_helpers-min.js');
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
  async.parallel({
    posts: function(callback) {
      tumblr_api_helpers.getPosts(function(data) {
        callback(null, data.posts);
      });
    }
    // repositories: function(callback){
    //   console.log('second called');
    // },
    // projects: function(callback){
    //   console.log('third called');
    // }
  },
  function(err, results) {
    // console.log(results);
    loadHomepage(res, results);
  });
});

// Need to use a helper to get a list of console platforms from the API, then
// use that to create a dropdown.
function loadHomepage(res, data) {
  modConf = utils.buildModConf("home", null, js_files, css_files, data);
  // console.log(modConf.data);
  res.render('partials/home', modConf);
};

module.exports = router;
