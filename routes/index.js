var express = require("express");
var router  = express.Router();
var User    = require("../models/user");
var passport    = require("passport");
    
//route route
router.get("/", function(req, res) {
    //res.send("this will be the navigation page");
    res.render("landing");
    console.log("this is the first page");
});



//===========
//AUTH ROUTES
//===========
// show regeister form
router.get("/register", function(req, res){
    res.render("register");
});
//handle signup logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        } 
        passport.authenticate("local")(req, res, function(){
            res.redirect("/courses");
        })
    });
});

//show login form
router.get("/login", function(req,res){
    console.log("this is login");

    res.render("login");
})

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/courses",
        failureRedirect: "/login"
    }), function(req, res){
});

//logout route
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/courses");
})

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;