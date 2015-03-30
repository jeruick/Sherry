var express = require('express.io'),
 	path = require("path"),
 	swig = require('swig'),
 	formidable = require('formidable'),
	fs = require('fs'),
	passport = require('passport'),
	bcrypt = require('bcrypt'),
	session = require('express-session');

	
var server = express();
server.http().io();

/*moduls*/
var homeController = require('./app/controllers/homecontroller');
var usersController = require('./app/controllers/userscontroller');
require('./app/models');
require('./passport')(passport);

/*settings*/
server.engine('html', swig.renderFile);
server.set('view engine', 'html' );
server.set('views', __dirname + '/app/views');
server.use(express.static('./public'));
var port = process.env.PORT || 3000;

server.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
server.use(passport.initialize());
server.use(passport.session());
/*routes*/
homeController(server, passport);
usersController(server, formidable, bcrypt, fs, path);


server.listen(port, function() {
  console.log("Listening on " + port);
});

