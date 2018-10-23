const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var { User } = require('../models/user');

passport.use(
    new localStrategy({
        usernameField: 'email'
    }, (username, password, done) => {
        console.log(username);
        User.findOne({ Email: username },
            (err, user) => {
                if (err){
                    console.log("Error here");
                    return done(err);
                }
                // unknown user
                else if (!user){
                    console.log("Error here 1 " + user);
                    return done(null, false, { message: 'Email is not registered' });
                }
                // wrong password
                else if (!user.verifyPassword(password)){
                    console.log("Error here 2");
                    return done(null, false, { message: 'Wrong password.' });
                }
                // authentication succeeded
                else{
                    console.log("authentication succeeded");
                    return done(null, user);
                }
            });
    })
);