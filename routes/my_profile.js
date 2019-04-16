var express = require("express");
var router  = express.Router();
var User    = require("../models/user");
var passport    = require("passport");
var Course  = require("../models/course");// this is for courses database setup
var fs = require("fs");

var json_data;


const path = require("path");

fs.readFile(path.resolve(__dirname, "../public/jsons/specification.json"), 
             {"encoding": "utf8"}, 
              function(err, data) {
     if (err)
        console.log(err);
     else {
        json_data = JSON.parse(data);  
        console.log(json_data);
     }
 });

router.get("/myprofile", function(req, res){
    res.render("profiles/myprofile", {json_data: json_data});
});

router.post("/myprofile", function(req, res){
    var survey = req.body;
    console.log(survey);
    var courseToTake = survey.courseToTake;
    var courseHours = parseInt(survey.courseHours,10);
    var courseHours_up = courseHours + 5;
    var courseHours_down = courseHours - 5;

    var courseDiff = parseInt(survey.courseDiff,10);
    var courseDiff_up = courseDiff + 0.5;
    var courseDiff_down = courseDiff - 0.5;
    
    console.log("hours:---");
    console.log(courseHours_up);
    console.log(courseHours_down);
    console.log(courseDiff_up);
    console.log(courseDiff_down);
    console.log("hours:----");

    
    var specification = survey.specification;
    var specification_data = json_data[specification];
    
    // console.log("specification_data:");
    // console.log(specification_data);
    //here we need to do the basic filer, filter the course list based on courseHours+-5 and courseDiff+-0.5
     Course.find({ $and: [ { workload: { $gt: courseHours_down } }, 
                           { workload: { $lt: courseHours_up } }, 
                            {difficulty:{$gt: courseDiff_down}},
                            {difficulty:{$lt: courseDiff_up}} ] },  function(err, filteredCourses){
        if(err){
            console.log("err");
        } else {
            console.log("find candidateCourses!");
            var candidateCourses;
            var min_workload = 1000;
            var max_workload = 0;
            var min_gpa = 1000;
            var max_gpa = -1;
            var min_rating = 1000;
            var max_rating = -1;
            var min_diff = 1000;
            var max_diff = -1;
            candidateCourses = filteredCourses;
            // using workload, rating, difficulty and GPA weight
            // normalize the course info into 0-1 , MIN-MAX
              Course.find({ $and: [ { workload: { $gt: 0 } } , 
                                    {difficulty:{$gt: 0} }  ,  
                                    {gpa : {$gt: 0}} ,
                                    {rating :{$gt : 0}  }]},
                                    function(err, filterdata){
                    if(err){
                        console.log("err");
                    } else {
                        
                        for(var i = 0; i < filterdata.length; i++) {
                            
                            var element = filterdata[i];
                            min_workload = Math.min(min_workload, element.workload);
                            max_workload = Math.max(max_workload, element.workload);
                            min_rating = Math.min(min_rating, element.rating);
                            max_rating = Math.max(max_rating, element.rating);
                            min_diff = Math.min(min_diff, element.difficulty);
                            max_diff = Math.max(max_diff, element.difficulty);
                            min_gpa = Math.min(min_gpa, element.gpa);
                            max_gpa = Math.max(max_gpa, element.gpa);
                            
                            checkFinished(survey.core, element);
                            checkFinished(survey.electives, element);
                            
                           
                            
                            
                            
                        }
                        
                       

                        if(candidateCourses == null) {
                            
                            console.error("No candidateCourses");
                            
                        } else {
                            
                            
                            console.log(parseFloat(survey.gpaWeight));
                            console.log(parseFloat(survey.ratingWeight));
                            console.log(parseFloat(survey.workloadWeight));
                            console.log(parseFloat(survey.difficultyWeight));

                            
                            
                            for(var i = 0; i < candidateCourses.length; i++) {
                                
                                
                                
                                var factorSum = parseFloat(survey.gpaWeight)
                                                +parseFloat(survey.ratingWeight)
                                                +parseFloat(survey.workloadWeight)
                                                +parseFloat(survey.difficultyWeight);
                                                
                                var element = candidateCourses[i];
                                var temp_workload = 1 - (candidateCourses[i].workload - min_workload) / (max_workload - min_workload) * 1.0;
                                var temp_rating = (candidateCourses[i].rating - min_rating) / (max_rating - min_rating) * 1.0;
                                var temp_diff = 1 - (candidateCourses[i].difficulty - min_diff) / (max_diff - min_diff) * 1.0;
                                var temp_gpa = (candidateCourses[i].gpa - min_gpa) / (max_gpa - min_gpa) * 1.0;
                                candidateCourses[i].score = temp_workload * parseFloat(survey.workloadWeight)/factorSum
                                + temp_rating * parseFloat(survey.ratingWeight)/factorSum 
                                + temp_diff * parseFloat(survey.difficultyWeight)/factorSum 
                                + temp_gpa * parseFloat(survey.gpaWeight)/factorSum  ;
                                
                                
                                checkFinished(survey.core, element);
                                checkFinished(survey.electives, element);
                            
                            }
                           
                            //sort by score
                            candidateCourses.sort(function(a, b) {
                                return parseFloat(b.score) - parseFloat(a.score);
                            });
                            
                             //finished updated and sorted candidateCourses from DB
                            // console.log(candidateCourses);
                            //show  candidate Courses
                            // console.log(specification_data);
                            //now show the ranking of all sepcification courses: core + electives
                            // filterdata is all data
                            // console.log("core_first");
                            // console.log(core_first);
                            // console.log("core_second");
                            // console.log(core_second);
                            // console.log("elective_first");
                            // console.log(elective_first);
                            // console.log("elective_second");
                            // console.log(elective_second);
                            // console.log("candidateCourses");
                            // console.log(candidateCourses);
                            
                            if(specification === "CPR" || specification === "II") {
                                
                                var core_first = specification_data["core"]["first"];
                                var core_second = specification_data["core"]["second"];
                                var elective_first = specification_data["electives"]["first"];
                                var elective_second = specification_data["electives"]["second"];
                                //check the candidate courses whether have cores and electives

                                //  res.render("degrees/degreetrack", {survey: survey, 
                                //                                 core_first: query(filterdata, core_first), 
                                //                                 core_second: query(filterdata, core_second),
                                //                                 elective_first: query(filterdata, elective_first),
                                //                                 elective_second:  query(filterdata, elective_second),
                                //                                 candidateCourses:candidateCourses});
                                 //create a new user and save to database
                                 
                                 User.findById(req.user._id, function(err, user){
                                     if(err){
                                         console.log("user not found"+err);
                                     } else {
                                         user.specification = specification;
                                         user.survey = survey;
                                         user.candidateCourses = candidateCourses;
                                         user.core_first = query(filterdata, core_first);
                                         user.core_second =  query(filterdata, core_second);
                                         user.elective_first = query(filterdata, elective_first);
                                         user.elective_second = query(filterdata, elective_second);
                                         user.save();
                                     }
                                 })
                               
                                  

                            }   else if(specification === "HCC" || specification === "HPC") {
                                 var core_first = specification_data["core"];
                                var core_second = specification_data["core"];
                                var elective_first = specification_data["electives"];
                                var elective_second = specification_data["electives"];
                                //check the candidate courses whether have cores and electives

                                //  res.render("degrees/degreetrack", {survey: survey, 
                                //                                 core_first: query(filterdata, core_first), 
                                //                                 core_second: query([], core_second),
                                //                                 elective_first: query(filterdata, elective_first),
                                //                                 elective_second:  query([], elective_second),
                                //                                 candidateCourses:candidateCourses});
                                                                
                                User.findById(req.user._id, function(err, user){
                                     if(err){
                                         console.log("user not found"+err);
                                     } else {
                                         user.specification = specification;
                                         user.survey = survey;
                                         user.candidateCourses = candidateCourses;
                                         user.core_first = query(filterdata, core_first);
                                         user.core_second =  query([], core_second);
                                         user.elective_first = query(filterdata, elective_first);
                                         user.elective_second = query([], elective_second);
                                         user.save();
                                     }
                                 })
                                
                            }  else if(specification === "HCI") {
                                 var core_first = specification_data["core"];
                                var core_second = specification_data["core"];
                                var elective_first = specification_data["electives"]["first"];
                                var elective_second = specification_data["electives"]["second"];
                                //check the candidate courses whether have cores and electives

                                //  res.render("degrees/degreetrack", {survey: survey, 
                                //                                 core_first: query(filterdata, core_first), 
                                //                                 core_second: query([], core_second),
                                //                                 elective_first: query(filterdata, elective_first),
                                //                                 elective_second:  query(filterdata, elective_second),
                                //                                 candidateCourses:candidateCourses});
                                                                
                                User.findById(req.user._id, function(err, user){
                                     if(err){
                                         console.log("user not found"+err);
                                     } else {
                                         user.specification = specification;
                                         user.survey = survey;
                                         user.candidateCourses = candidateCourses;
                                         user.core_first = query(filterdata, core_first);
                                         user.core_second =  query([], core_second);
                                         user.elective_first = query(filterdata, elective_first);
                                         user.elective_second = query(filterdata, elective_second);
                                         user.save();
                                     }
                                 })
                                
                            }  else if(specification == null || specification == "") {
                                console.log("here");
                                // res.render("degrees/degreetrack", {survey: survey, 
                                //                                 core_first: query([], []), 
                                //                                 core_second: query([], []),
                                //                                 elective_first: query([], []),
                                //                                 elective_second:  query([], []),
                                //                                 candidateCourses:candidateCourses});
                                                                
                                User.findById(req.user._id, function(err, user){
                                     if(err){
                                         console.log("user not found"+err);
                                     } else {
                                         user.specification = specification;
                                         user.survey = survey;
                                         user.candidateCourses = candidateCourses;
                                         user.core_first = query([], []);
                                         user.core_second =  query([], []);
                                         user.elective_first = query([], []);
                                         user.elective_second = query([], []);
                                         user.save();
                                     }
                                 })
                                
                            } else  {
                                // console.log("here");
                                var core_first = specification_data["core"]["first"];
                                var core_second = specification_data["core"]["second"];
                                var elective_first = specification_data["electives"];
                                var elective_second = specification_data["electives"];
                                //check the candidate courses whether have cores and electives
                                // console.log( elective_first);
                                // console.log( query(filterdata, elective_first) );

                                //  res.render("degrees/degreetrack", {survey: survey, 
                                //                                 core_first: query(filterdata, core_first), 
                                //                                 core_second: query(filterdata, core_second),
                                //                                 elective_first: query(filterdata, elective_first),
                                //                                 elective_second:  query([], elective_second),
                                //                                 candidateCourses:candidateCourses});
                                                                
                                User.findById(req.user._id, function(err, user){
                                     if(err){
                                         console.log("user not found"+err);
                                     } else {
                                         user.specification = specification;
                                         user.survey = survey;
                                         user.candidateCourses = candidateCourses;
                                         user.core_first = query(filterdata, core_first);
                                         user.core_second =  query(filterdata, core_second);
                                         user.elective_first = query(filterdata, elective_first);
                                         user.elective_second = query([], elective_second);
                                         user.save();
                                     }
                                 })
                                        
                            }
                            
                             res.redirect("/degreetrack");
                                
                        }
                        
                            
                    }
                });
                
                
                
                


        }
    });
    
    
   

    
});


function query(data, input) {
    

    var results = [];

    for(var i = 0; i < data.length; i++) {
        
        if(Array.isArray(input)) {
            
            for(var j = 0; j < input.length; j++) {
                
                 var courseID = input[j].split(" ")[0];
                 if(data[i].id === courseID) {
                     results.push(data[i]);
                 }
                    
            }
            
            
        } else {
            
            var courseID = input.split(" ")[0];
             if(data[i].id === courseID) {
                 results.push(data[i]);
             }
            
        }
        
        
        
    }
    return results;

    
}

function checkSpec(spec, candid) {
    
    var results = [];

    for(var i = 0; i < spec.length; i++) {
        for(var j = 0; j < candid.length; j++) {
            
            if(spec[i].id === candid[j].id) {
                
                results.push(spec[i].id);

            }
            
        }
    }
    return results;
    
    
    
    
}

function checkFinished(target, element) {
    
     if(target != null) {
            if(Array.isArray(target)) {
                
                for(var j = 0; j < target.length; j++) {
                    if(element.id === target[j]) {
                        element.finished = "YES";
                    }
                }
            } else {
                if(element.id === target) {
                        element.finished = "YES";
                    }
            }
                                
    }
    
}



module.exports = router;