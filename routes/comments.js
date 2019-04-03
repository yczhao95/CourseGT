var express = require("express");
var router  = express.Router();
var Course  = require("../models/course");
var Comment = require("../models/comment");
// ========================
// COMMENTR ROUTES
// ========================
router.get("/courses/:id/comments/new", isLoggedIn, function(req, res) {
    //find course by id
    Course.findById(req.params.id, function(err, course){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {course: course});       
        }
    });
});

router.post("/courses/:id/comments", isLoggedIn, function(req, res){
    //look up course using id
    // then push the comments in the courses
    Course.findById(req.params.id, function(err, course){
        if(err){
            console.log("course not found"+err);
            //redirect
            res.redirect("/courses");
        } else {
            Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               } else {
                   course.comments.push(comment);
                   course.save();
                   res.redirect("/courses/" + course._id);
               }
            });
        }
        
    });
    //create new comment
    //connect new comment to course
    //redeirect show page
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;