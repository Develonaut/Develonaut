function loadHomepage(e){modConf=utils.buildModConf("home",null,js_files,css_files,null),e.render("partials/home",modConf)}var express=require("express"),router=express.Router(),path=require("path"),_=require("underscore"),helper_path="../../private/js/server/helpers/min/",utils=require(helper_path+"utils-min.js"),result={msg:null,markup:null},js_files=["/js/page/home-min.js"],css_files=["/css/home-min.css"];router.get("/",function(e,s,r){loadHomepage(s)}),module.exports=router;