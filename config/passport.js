var LocalStrategy = require("passport-local");
var FacebookStrategy = require('passport-facebook').Strategy;

var User = require("../models/user");

var fbCongig = require("./facebook");



module.exports = function(passport) {


    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use("local-login", new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },	
        function(req, username, password, done) {
            process.nextTick(function() {
                User.findOne({ "local.username": username }, function(err, user) {
                    if (err)
                        return done(err);
                    if (!user)
                        return done(null, false);
                    if (user.local.password != password) {
                        return done(null, false);
                    }
                    return done(null,user);

                })
            })
        }
    ))

    passport.use("local-signup", new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, username, password, done) {
            process.nextTick(function() {
                User.findOne({ "local.username": username }, function(err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, false, req.flash("signUpMessage", "Email Not Found "));
                    } else {
                        var newUser = new User();
                        newUser.local.username = username;
                        newUser.local.password = password;

                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        })
                    }
                })
            })
        }
    ))

    passport.use(new FacebookStrategy({
            clientID: fbCongig.facebookAuth.clientID,
            clientSecret: fbCongig.facebookAuth.clientSecret,
            callbackURL: fbCongig.facebookAuth.callBackUrl

        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function() {
                User.findOne({ "facebook.id": profile.id }, function(err, user) {
                    if (err)
                        return done(err);
                    if (user)
                        return done(null, user);
                    else {
                        var newUser = new User();
                        newUser.facebook.id = profile.id;
                        newUser.facebook.token = accessToken;
                        newUser.facebook.name = profile.name.givenName + " " + profile.name.familyName;
                        // newUser.facebook.email = profile.emails[0].value;

                        newUser.save(function(err) {
                            if (err)
                                console.log(err);

                            return done(null, newUser);
                        })

                    }
                });
            })
        }
    ));

};