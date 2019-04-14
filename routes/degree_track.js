var express = require("express");
var router  = express.Router();
var User    = require("../models/user");
var passport    = require("passport");
var Course  = require("../models/course");// this is for courses database setup

router.get("/degreetrack", function(req, res){
    res.render("degrees/degreetrack");
});


module.exports = router;