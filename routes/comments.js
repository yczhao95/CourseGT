var express = require("express");
var router  = express.Router({mergeParams: true});
var Course  = require("../models/course");
var Comment = require("../models/comment");
// ========================
// COMMENTR ROUTES
// ========================
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength,padString) {
        targetLength = targetLength>>0; //floor if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0,targetLength) + String(this);
        }
    };
}
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
                    var today = new Date();
                    var dd = String(today.getDate()).padStart(2, '0');
                    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                    var yyyy = today.getFullYear();
                    today = mm + '/' + dd + '/' + yyyy;
                    comment.date = today;
                    //save comment
                    comment.save();
                    course.comments.push(comment);
                    var len = course.comments.length;
                    course.rating = (course.rating * (len - 1) +  comment.rating) / len;
                    course.difficulty = (course.difficulty * (len - 1) +  comment.difficulty) / len;
                    course.workload = (course.workload * (len - 1) +  comment.workload) / len;
                    var i;
                    console.log(comment);
                    for (i = 0; i < course.histories.length; i++) { 
                        if(course.histories[i].prof_name === comment.professor) {
                            course.histories[i].num_comment++;
                            course.histories[i].workload = (course.histories[i].workload * (course.histories[i].num_comment-1) + comment.workload) / course.histories[i].num_comment; 
                            course.histories[i].difficulty = (course.histories[i].difficulty * (course.histories[i].num_comment-1) + comment.difficulty) / course.histories[i].num_comment;
                            course.histories[i].rating = (course.histories[i].rating * (course.histories[i].num_comment-1) + comment.rating) / course.histories[i].num_comment;
                        }
                    }
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