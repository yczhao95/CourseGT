
var mongoose    = require("mongoose");
//SCHEMA SETUP
var courseSchema = new mongoose.Schema({
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
    }]
});

module.exports = mongoose.model("Course", courseSchema);

