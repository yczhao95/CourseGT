var express = require("express");
var router  = express.Router();
var User    = require("../models/user");
var passport    = require("passport");
var Course  = require("../models/course");// this is for courses database setup
var fs = require("fs");

var json_data;

const path = require("path");

fs.readFile(path.resolve(__dirname, "../views/profiles/specification.json"), 
             {"encoding": "utf8"}, 
              function(err, data) {
     if (err)
        console.log(err);
     else {
        json_data = JSON.parse(data);  
        console.log(json_data);

     }
 });

router.get("/myprofile", function(req, res){
    res.render("profiles/myprofile", {json_data: json_data});
});

router.post("/myprofile", function(req, res){
    console.log(req.body);
    res.redirect("/myprofile");
});

module.exports = router;