var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var passport = require ("passport");
var flash = require("connect-flash");
var session = require("express-session");

var User = require("./models/user.js");
var Alarm = require("./models/alarm.js");

app.use(express.static("public"));
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(session({
    secret:"secret",
    saveUnitialized: true,
    resave:true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/mrsleepy", {
    useMongoClient: true
});
var db = mongoose.connection;

db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

db.once("open", function() {
    console.log("Mongoose connection successful.");
});

var exhbs = require("express-handlebars");
app.engine("handlebars", exhbs());
app.set("view engine", "handlebars");

require("./config/passport")(passport);
require("./routes/api-routes.js")(app,passport);
require("./routes/html-routes.js")(app);


////////PASSPORT////////////

console.log("\n******************************************\n" +
    "----------------RUNNING--------------------- \n" +
    "-------------------SERVER-----------------------\n" +
    "--------------------NOW----------------------" +
    "\n******************************************\n");



app.listen(3000, function() {
    console.log("App running on port 3000!");
});