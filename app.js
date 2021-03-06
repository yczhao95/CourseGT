var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Course      = require("./models/course"),
    seedDB      = require("./seeds"),
    Comment     = require("./models/comment"),
    User        = require("./models/user")

//requiring routes
var commentRoutes   = require("./routes/comments"),
    courseRoutes    = require("./routes/courses"),//this is for adding, showing, all the courses
    indexRoutes     = require("./routes/index"), // this is for showing all the user login page(login, register and logout)
    searchRoutes     = require("./routes/search_course"),// this is for search course routing in front page
    degreeRoutes     = require("./routes/degree_track"),
    myprofileRoutes   = require("./routes/my_profile")

mongoose.connect("mongodb://localhost:27017/gt_course", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
//
app.use(express.static(__dirname+"/public"));

seedDB();

// passport configuration
app.use(require("express-session")({
    secret: "once again rusty wins cutest dog",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/",indexRoutes);
app.use("/courses/:id/comments",commentRoutes);
app.use("/courses",courseRoutes);
app.use(degreeRoutes);
app.use(myprofileRoutes);
app.use(searchRoutes);




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("GTCourse server has started");
});