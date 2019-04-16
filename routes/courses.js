var express = require("express");
var router  = express.Router();
var Course  = require("../models/course");// this is for courses database setup
var Comment = require("../models/comment");// this is for comments database setup
var fileupload = require("express-fileupload");

router.use(fileupload())
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

router.post('/:id/upload', function(req, res) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
  Course.findById(req.params.id, function(err, course){
      if(err){
           console.log(err);
        } else {
            var type = sampleFile.name.split('.');
            var filename = course.name + "_syllabus_" +  course.files.length.toString() + "." + type[1];
            sampleFile.mv('uploads/'+filename, function(err) {
            if (err){
              return res.status(500).send(err);
            }
            console.log(sampleFile);
            var file = {
                file_name : filename
            };
            course.files.push(file);
            course.save();
            res.redirect("/courses/"+course._id);
          });
        }
  });
  // Use the mv() method to place the file somewhere on your server
});
//download file
router.get('/download/:id', function(req, res){
  var file = "uploads/"+req.params.id;
  res.download(file); // Set disposition and send it.
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