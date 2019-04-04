var express = require("express");
var router  = express.Router();
var User    = require("../models/user");
var passport    = require("passport");
var Course  = require("../models/course");// this is for courses database setup

router.get("/degreetrack", function(req, res){
    res.render("degrees/degreetrack0");
});

router.get("/degreetrack1", function(req, res){
    res.render("degrees/degreetrack1");
});

router.get("/degreetrack2", function(req, res){
    res.render("degrees/degreetrack2");
});

router.get("/degreetrack3", function(req, res){
    res.render("degrees/degreetrack4");
});

router.post("/degreetrack", function(req, res){
    console.log(req.body);
    console.log(req.body.major1);
    console.log(req.body.major2);
    res.redirect("/degreetrack1");
});

router.post("/degreetrack1", function(req, res){
    res.redirect("/degreetrack2");
});

router.post("/degreetrack2", function(req, res){
    res.redirect("/degreetrack3");
});

router.post("/degreetrack3", function(req, res){
    res.redirect("/degreetrack4");
});


module.exports = router;