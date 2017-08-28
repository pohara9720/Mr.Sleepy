var path = require("path");

// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect("/login");
// };

module.exports = function(app) {
    app.get("/", function(req, res) {
        console.log("We made it home");
        // res.sendFile(path.join(__dirname + "/../public/home.html"));
        res.render("alarm", { layout: "alarmlay" });
    });

    // app.get("/", isLoggedIn ,function(req, res) {
    //     res.render("alarm", { layout: "alarmlay" }, {user: req.user});
    // });


    app.get("/login", function(req, res) {
        console.log("made it to login");
        res.render("login", { layout: "alarmlay" });
    });

    app.get("/signup", function(req, res) {
        res.render("signup", { layout: "alarmlay" });
    });

    app.get("/signin", function(req, res) {
        res.render("signin", { layout: "alarmlay" });

    })


};