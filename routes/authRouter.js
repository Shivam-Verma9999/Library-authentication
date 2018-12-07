/*jshint esversion : 6 */
var express = require('express');
var passport = require('passport');
var { MongoClient } = require('mongodb');
const authRouter = express.Router();

function router(nav){
    authRouter.route('/signup')
    .post((req, res) => {
        (async function signup(){
            const url = "mongodb://localhost:27017";
            const dbname = "Demodb";
            const {username, password} = req.body;
            const user = {username, password};

            try{
                const client =await MongoClient.connect(url);
                const db = client.db(dbname);
                const col = db.collection('users');
                const result =await  col.insert(user);
                req.login(req.body, ()=>{
                    res.redirect('/auth/profile');
                });
                client.close();
            } catch(err){
                console.log(err);
            }

        }());
        
    });

    authRouter.route('/signin')
    .get((req, res) =>{
        res.render('signin', {
            nav,
            title: "Sign in"
        });
    })
    .post(passport.authenticate('local', {
        successRedirect: "/books",
        failureRedirect: "/error"
    }));

    authRouter.route('/profile')
    .get((req, res)=>{
        res.json(req.user);
    });

    return authRouter;
}

module.exports  = router;