var request = require('request');
var _ = require('underscore');
var fs = require("fs");

// var helper_path = "../min/";
// var cache_helper = require(helper_path + 'cache_helpers-min.js');

var tumblr_api_key = 'api_key=fEMIZEqo2aOm7kB30zc0q12WEQQmXIrNYPVvgNJpn4waM2cWNq';
var tumblr_posts_path = 'https://api.tumblr.com/v2/blog/ryanmcart.tumblr.com/posts';

https://api.tumblr.com/v2/blog/ryanmcart.tumblr.com/posts?api_key=fEMIZEqo2aOm7kB30zc0q12WEQQmXIrNYPVvgNJpn4waM2cWNq

module.exports = {
  getPosts: function(callback) {
    request(tumblr_posts_path + '?' + tumblr_api_key, function (error, response, body) {
      var results = {
        posts: null 
      };

      if (!error && response.statusCode == 200) {
        if (!_.isEmpty(body)) {
            console.log
            var body = JSON.parse(body);
            var posts = body.response.posts;
            results.posts = posts;
        } else {
            console.log('Something went wrong in the get posts call.');
        }
      }
      callback(results);
    });
  }
};