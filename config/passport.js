/*jshint esversion :6*/
const passport = require('passport');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');


module.exports = function session(server){

    server.use(passport.initialize());
    server.use(passport.session());

    // stores user in session
    passport.serializeUser((user, done)=>{
        done(null, user);
    });

    //retrieves user from the session
    passport.deserializeUser((user, done)=>{
        done(null, user);
    });

    require('./strategies/local.strategy')();

};