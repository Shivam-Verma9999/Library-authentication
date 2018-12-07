/*jshint esversion : 6 */
const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');

module.exports = function localStrategy(){
    passport.use(new Strategy(
        {
            usernameField : "username",
            passwordField : "password"
        }, (username ,password, done) =>{
            const url = "mongodb://localhost:27017";
            const dbname = "Demodb";
            var user =  false;
            (async function checkuser(){
                try{
                    const client =await MongoClient.connect(url);
                    const db = client.db(dbname);
                    const col = db.collection("users");
                    const result =await col.find({username : username}).toArray();
                    if(result[0].password === password){
                        user = { username, password };
                    }
                    done(null, user);
                    console.log(result);
                    client.close();
                } catch(err){
                    console.log(err);
                }
                
            }());
        }
    ));
};