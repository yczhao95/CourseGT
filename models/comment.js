var mongoose = require("mongoose");
 
var commentSchema = new mongoose.Schema({
    text:       String,
    author:     {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username: String
    },
    workload:   Number,
    difficulty: Number,
    rating:     Number,
    professor:  String,
    date:       String
});
 
module.exports = mongoose.model("Comment", commentSchema);