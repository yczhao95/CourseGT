var express = require("express");
var router  = express.Router();
var User    = require("../models/user");
var passport    = require("passport");
var Course  = require("../models/course");// this is for courses database setup


// search the courses in the front pages
router.post("/", function(req, res){
    //res.send("you send the post route");
   //get data from form and add to course array
   console.log("this is for search");

   var  inputcourse = req.body.inputcourse;
   console.log(inputcourse);
   Course.find({},  function(err, allCourses){
        if(err){
            console.log("err");
        } else {
            console.log(allCourses);
        }
    })
   //create a new course and save to database
            //if the search course exists
            //redirect to the target course page  
            //else
            //give the course didn't exist error page

});



module.exports = router;