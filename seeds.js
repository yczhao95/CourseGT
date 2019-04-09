var mongoose = require("mongoose");
var Course = require("./models/course");
var Comment   = require("./models/comment");
 
var data = [
    {
        id: "CS4365/CS6365",
        name: "Enterprise Computing", 
        professor: "Calton Pu",
        gpa: "3.88",
        workload:   "0",
        difficulty: "0",
        rating:     "0",
        histories:[
            {   
                prof_name:"hulk",
                prof_gpa:3.01,
                prof_a:40,
                prof_b:20,
                prof_c:15,
                prof_d:15,
                prof_f:6,
                prof_w:4,
            },
            {     
                prof_name:"ironman",
                prof_gpa:3.05,
                prof_a:60,
                prof_b:0,
                prof_c:15,
                prof_d:15,
                prof_f:3,
                prof_w:7,
            },
        ]
    },
    {
        id: "CSE4262/CSE6242",
        name: "Data and Visual Analytics", 
        professor: "Polo Chao",
        workload:   "0",
        difficulty: "0",
        rating:     "0",
        gpa: "3.76",histories:[
            {   
                prof_name:"hulk",
                prof_gpa:3.01,
                prof_a:40,
                prof_b:20,
                prof_c:15,
                prof_d:15,
                prof_f:6,
                prof_w:4,
            },
            {     
                prof_name:"ironman",
                prof_gpa:3.05,
                prof_a:60,
                prof_b:0,
                prof_c:15,
                prof_d:15,
                prof_f:3,
                prof_w:7,
            },
        ],
        histories:[
            {   
                prof_name:"hulk",
                prof_gpa:3.01,
                prof_a:40,
                prof_b:20,
                prof_c:15,
                prof_d:15,
                prof_f:6,
                prof_w:4,
            },
            {     
                prof_name:"ironman",
                prof_gpa:3.05,
                prof_a:60,
                prof_b:0,
                prof_c:15,
                prof_d:15,
                prof_f:3,
                prof_w:7,
            },
        ],
       
    }, 
    {
        id: "CS4641/CS7641",
        name: "Machine Learning", 
        gpa: 3.56,
        a:45,
        b:15,
        c:20,
        d:15,
        f:6.5,
        w:4.5,
        workload:   "0",
        difficulty: "0",
        rating:     "0",
        histories:[
            {   
                prof_name:"hulk",
                prof_gpa:3.01,
                prof_a:40,
                prof_b:20,
                prof_c:15,
                prof_d:15,
                prof_f:6,
                prof_w:4,
            },
            {     
                prof_name:"ironman",
                prof_gpa:3.05,
                prof_a:60,
                prof_b:0,
                prof_c:15,
                prof_d:15,
                prof_f:3,
                prof_w:7,
            },
        ],
        num_review:0
       
    }
    
]
 //need to explain more in this part
function seedDB(){
   //Remove all campgrounds
   Course.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed courses!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed courses!");
             //add a few campgrounds
            data.forEach(function(seed){
                Course.create(seed, function(err, course){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a course");
                        course.rating = 0;
                        course.save();
                        //create a comment
                        /*
                        Comment.create(
                            {
                                text: "This class is great, but it sucks",
                                author: "Arthus"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    course.comments.push(comment);
                                    course.save();
                                    console.log("Created new comment");
                                }
                            });*/
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;