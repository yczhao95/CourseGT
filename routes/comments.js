var express = require("express");
var router  = express.Router({mergeParams: true});
var Course  = require("../models/course");
var Comment = require("../models/comment");
// ========================
// COMMENTR ROUTES
// ========================

//comments new
router.get("/new", isLoggedIn, function(req, res) {
    //find course by id
    Course.findById(req.params.id, function(err, course){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {course: course});       
        }
    });
});

//comments create
router.post("/", isLoggedIn, function(req, res){
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
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    course.comments.push(comment);
                    var len = course.comments.length;
                    course.rating = (course.rating * (len - 1) +  comment.rating) / len;
                    course.difficulty = (course.difficulty * (len - 1) +  comment.difficulty) / len;
                    course.workload = (course.workload * (len - 1) +  comment.workload) / len;
                    course.save();
                    res.redirect("/courses/" + course._id);
                }
            });
        }
        
    });
});

//middle ware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;