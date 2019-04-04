var express = require("express");
var router  = express.Router();
var User    = require("../models/user");
var passport    = require("passport");
var Course  = require("../models/course");// this is for courses database setup
router.get("/myprofile", function(req, res){
    res.render("myprofile");
});

module.exports = router;