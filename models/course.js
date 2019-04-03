
var mongoose    = require("mongoose");
//SCHEMA SETUP
var courseSchema = new mongoose.Schema({
    name: String,
    professor: String,
    gpa: Number,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"   // this is reference to Comment table/collection
        }
    ]
});

module.exports = mongoose.model("Course", courseSchema);

