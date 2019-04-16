var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    specification: String,
    survey: Object,
    candidateCourses:[
         {
           id: String,
    name: String,
    gpa: Number,
    description: String,
    a:  Number,
    b:  Number,
    c:  Number,
    d:  Number,
    f:  Number,
    w:  Number,
    histories:[
        {
            prof_name:  String,
            prof_gpa:   Number,
            prof_a:     Number,
            prof_b:     Number,
            prof_c:     Number,
            prof_d:     Number,
            prof_f:     Number,
            prof_w:     Number,
            workload:   Number,
            difficulty: Number,
            rating:     Number,
            num_comment: Number
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"   // this is reference to Comment table/collection
        }
    ],
    workload:   Number,
    difficulty: Number,
    rating:     Number,
    score:      Number,
    files: [{
        file_name: String
    }],
    finished: String
        }
        ],
    core_first:[
        {
           id: String,
    name: String,
    gpa: Number,
    description: String,
    a:  Number,
    b:  Number,
    c:  Number,
    d:  Number,
    f:  Number,
    w:  Number,
    histories:[
        {
            prof_name:  String,
            prof_gpa:   Number,
            prof_a:     Number,
            prof_b:     Number,
            prof_c:     Number,
            prof_d:     Number,
            prof_f:     Number,
            prof_w:     Number,
            workload:   Number,
            difficulty: Number,
            rating:     Number,
            num_comment: Number
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"   // this is reference to Comment table/collection
        }
    ],
    workload:   Number,
    difficulty: Number,
    rating:     Number,
    score:      Number,
    files: [{
        file_name: String
    }],
    finished: String
        }
        ],
    core_second:[
         {
            id: String,
    name: String,
    gpa: Number,
    description: String,
    a:  Number,
    b:  Number,
    c:  Number,
    d:  Number,
    f:  Number,
    w:  Number,
    histories:[
        {
            prof_name:  String,
            prof_gpa:   Number,
            prof_a:     Number,
            prof_b:     Number,
            prof_c:     Number,
            prof_d:     Number,
            prof_f:     Number,
            prof_w:     Number,
            workload:   Number,
            difficulty: Number,
            rating:     Number,
            num_comment: Number
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"   // this is reference to Comment table/collection
        }
    ],
    workload:   Number,
    difficulty: Number,
    rating:     Number,
    score:      Number,
    files: [{
        file_name: String
    }],
    finished: String
        }
        ],
    elective_first:[
         {
            id: String,
    name: String,
    gpa: Number,
    description: String,
    a:  Number,
    b:  Number,
    c:  Number,
    d:  Number,
    f:  Number,
    w:  Number,
    histories:[
        {
            prof_name:  String,
            prof_gpa:   Number,
            prof_a:     Number,
            prof_b:     Number,
            prof_c:     Number,
            prof_d:     Number,
            prof_f:     Number,
            prof_w:     Number,
            workload:   Number,
            difficulty: Number,
            rating:     Number,
            num_comment: Number
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"   // this is reference to Comment table/collection
        }
    ],
    workload:   Number,
    difficulty: Number,
    rating:     Number,
    score:      Number,
    files: [{
        file_name: String
    }],
    finished: String
        }
        ],
    elective_second:[
         {
           id: String,
    name: String,
    gpa: Number,
    description: String,
    a:  Number,
    b:  Number,
    c:  Number,
    d:  Number,
    f:  Number,
    w:  Number,
    histories:[
        {
            prof_name:  String,
            prof_gpa:   Number,
            prof_a:     Number,
            prof_b:     Number,
            prof_c:     Number,
            prof_d:     Number,
            prof_f:     Number,
            prof_w:     Number,
            workload:   Number,
            difficulty: Number,
            rating:     Number,
            num_comment: Number
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"   // this is reference to Comment table/collection
        }
    ],
    workload:   Number,
    difficulty: Number,
    rating:     Number,
    score:      Number,
    files: [{
        file_name: String
    }],
    finished: String
        }
        ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);