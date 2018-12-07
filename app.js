/*jshint esversion: 6 */
const express = require('express');
const body_parser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const server = express();

server.use(morgan('tiny'));
server.use(express.static(path.join(__dirname, '/public')));
server.set('view engine', 'ejs');
server.use(body_parser.urlencoded({
  extended: true
}));
server.use(cookieParser());
server.use(session({secret : "mySecret"}));
require("./config/passport.js")(server);

const nav = [{ 
	link: "HOME",
  href: "/books"
}];

const bookRouter = require(path.join(__dirname, "/routes/bookroute.js"))(nav);
const authRouter = require(path.join(__dirname, "/routes/authRouter.js"))(nav);

server.get("/error", (req, res)=>{res.render("error");} );
server.use('/books', bookRouter);
server.use("/auth", authRouter);

server.listen(5000, (err) => {
	if (!err) {
		console.log("Listening...");
	} else {
		console.log("error");
	}
});