/*jshint esversion: 6 */
const express = require('express');
const { MongoClient, ObjectID} = require('mongodb');

const bookRouter = express.Router();


function route(nav) {

    bookRouter.route('/')
        .get((req, res) => {

            const url = "mongodb://127.0.0.1:27017";
            const dbname = "Demodb";

            ( async function mongo(){
                let client;
                try{
                    client = await MongoClient.connect(url);
                    console.log("Connected to mongodb");

                    let db = client.db(dbname);
                    let books = await db.collection('democollection').find().toArray();
                    console.log(books);
                    res.render('index', {
                        title: "Library",
                        books,
                        nav
                    });
                    client.close();
                    db.close();

                }catch(err){
                    console.log(err.stack);
                }
            }());

           
        });

    bookRouter.route('/singlebook/:id')
        .get((req, res) => {
            
            let bookId = req.params.id;

            const url = "mongodb://127.0.0.1:27017";
            const dbname = "Demodb";

            (async function mongo() {
                try{
                    let client = await MongoClient.connect(url);
                    let db = client.db(dbname);
                    let book = await db.collection('democollection').findOne({_id : new ObjectID(bookId)});
                    console.log(book);
                    res.render('book', {
                        title: "Single Book",
                        book,
                        nav
                    });
                    client.close();
                }catch(err){
                    console.log(err.stack);
                }
                
            }());
            
        });
    return bookRouter;
}
module.exports = route;