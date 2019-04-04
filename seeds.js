var mongoose = require("mongoose");
var Course = require("./models/course");
var Comment   = require("./models/comment");
 
var data = [
    {
        id: "CS4365/CS6365",
        name: "Enterprise Computing", 
        professor: "Calton Pu",
        gpa: "3.88"
       
    },
    {
        id: "CSE4262/CSE6242",
        name: "Data and Visual Analytics", 
        professor: "Polo Chao",
        gpa: "3.76"
       
    }, 
    {
        id: "CS4641/CS7641",
        name: "Machine Learning", 
        professor: "Tuo Zhao",
        gpa: "3.56"
       
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
                        //create a comment
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
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;