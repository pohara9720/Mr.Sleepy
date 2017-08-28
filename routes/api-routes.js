var User = require("../models/user");


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};
module.exports = function(app, passport) {

    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/login',
            failureRedirect: '/signup',
            failureFlash: true
        })
    );


      app.post('/signin', passport.authenticate('local-login', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })
    );


    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

    app.post("/signup",function(req,res){
    	var newUser = new User();
    	newUser.local.username = req.body.username;
    	newUser.local.password = req.body.password;

    	console.log(newUser.local.username + " " +newUser.local.password);
    	newUser.save(function(err){
    		if(err)
    			throw err;

    	})
    	res.send("success");
    })

    app.get("/", isLoggedIn ,function(req, res) {
        console.log("this is the user", req.user);
        res.render("alarm", { layout: "alarmlay" });
    });

}