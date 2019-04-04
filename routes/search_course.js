var express = require("express");
var router  = express.Router();
var User    = require("../models/user");
var passport    = require("passport");
var Course  = require("../models/course");// this is for courses database setup



// search the courses in the front pages
 //create a new course and save to database
//if the search course exists
//redirect to the target course page  
//else
//give the course didn't exist error page
router.post("/", function(req, res){
    //res.send("you send the post route");
   //get data from form and add to course array
   console.log("this is for search");
   var  inputcourse = req.body.inputcourse;
   console.log(inputcourse);
   
   if(inputcourse == null || inputcourse.length == 0 ) {
       res.redirect("/");
   } else {
       Course.find( {id :  { "$regex" : ".*" + inputcourse +  ".*" , "$options" : "i"} },  function(err, allCourses){
        if(err){
            console.log("err");
        } else {
            if(allCourses.length == 0) {
                console.log("course not find");
                res.redirect("/")
            } else {
                console.log(allCourses.length);
                //if the number of results is only one, we directly go to that page
                // else we show all match pages
                if(allCourses.length == 1) {
                    var course_hashcode = allCourses[0]._id;
                    res.redirect("/courses/" + course_hashcode);
                } else {
                    res.render("courses/index", {courses: allCourses});
                }
            }
           
        }
    })
       
   }
   
  

});



module.exports = router;