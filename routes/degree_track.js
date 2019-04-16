var express = require("express");
var router  = express.Router();
var User    = require("../models/user");
var passport    = require("passport");
var Course  = require("../models/course");// this is for courses database setup

router.get("/degreetrack", function(req, res){
      User.findById(req.user._id, function(err, data){
        
        if(err) {
            console.error("get user data error");
        } else {
           
            console.log("database:..........");
            console.log(data.core_first);
            console.log("database:..........");
            res.render("degrees/degreetrack", {survey: data.survey, 
                                                            core_first: data.core_first, 
                                                            core_second: data.core_second,
                                                            elective_first: data.elective_first,
                                                            elective_second:  data.elective_second,
                                                            candidateCourses: data.candidateCourses});
        }
        
    });
    
    
   
});


module.exports = router;