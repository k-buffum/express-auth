var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var session = require("express-session");
var flash = require("connect-flash");
var db = require("./models");
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(ejsLayouts);
app.use(session({
	secret: "akdljfaioieoaaiuhfiauifnanvadfa",
	resave: false,
	saveUninitialized: true
}));
app.use(flash()); // must be after session

// Checks to see if user logged in
// if logged in, currentUser is set to user
// if user not logged in, currentUser is set to false
app.use(function(req, res, next) {
	if (req.session.userId) {
		db.user.findById(req.session.userId).then(function(user) {
			req.currentUser = user;
			res.locals.currentUser = user;
			next();
		});
	} else {
		req.currentUser = false;
		res.locals.currentUser = false;
		next();
	}
})

// Home page
app.get('/', function(req, res) {
	console.log(req.session.userId);
  res.render('index', {alerts: req.flash()});
});

// Secret page
app.get('/secret', function(req, res) {
	if (req.currentUser) {
		res.render("secret");
	} else {
		req.flash("danger", "You must be logged in to view the page");
		res.redirect("/");
	}
});

app.use('/auth', require('./controllers/auth'));

app.listen(3000);
