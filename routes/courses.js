var express = require("express");
var router  = express.Router();
var Course  = require("../models/course");// this is for courses database setup
var Comment = require("../models/comment");// this is for comments database setup
var something = require("https://code.jquery.com/jquery-3.3.1.js");

//==========
//INDEX ROUTE
//==========
// courses ---> main page: index
// courses ---> add course info : post in courses
router.get("/", function(req,res) {
        //res.render("courses", {courses:courses})
    //get all courses from DB
    Course.find({},  function(err, allCourses){
        if(err){
            console.log("err");
        } else {
            res.render("courses/index", {courses:allCourses});
        }
    })
});

router.post("/", function(req, res){
    //res.send("you send the post route");
   //get data from form and add to course array
   var courseid = req.body.courseid;
   var name = req.body.name;
   var professor = req.body.professor;
   var gpa = req.body.gpa;
   var newCourse = {id: courseid, name: name, professor:professor, gpa: gpa};
   //create a new course and save to database
   Course.create(newCourse, function(err, newlyCreated) {
        if(err){
            console.log(err);
        } else {
            res.redirect("/courses");
            //redirect back to course page    
      }
   });
});

// new - show forms to create course
router.get("/new", function(req, res){
    res.render("courses/new.ejs");
});

//show more infor about a course
router.get("/:id", function(req, res){
    //find the course with provided id
    Course.findById(req.params.id).populate("comments").exec(function(err, foundCourse){
         if(err){
             console.log(err);
         } else {
             //render the show template with that course
             console.log("find courses:");
             console.log(foundCourse);
             res.render("courses/show.ejs", {course: foundCourse});
         }
    });
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};
//table sort


module.exports = router;