var express = require('express');
var db = require("../models");
var router = express.Router();


router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.post('/signup', function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  db.user.findOrCreate({
  	where: {
  		email: email
  	},
  	defaults: {
  		name: name,
  		password: password
  	}
  }).spread(function(user, created) {
  	if (created) {
  		res.redirect("/");
  	} else {
  		// res.send("User already exists");
  	 req.flash("danger", "User already exists");
     res.redirect("/");
    }
  }).catch(function(err) {  // catches errors coming from sequelize
  	req.flash("danger", err.message);
    res.redirect("/");
    // res.send(err);
  });
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.post('/login', function(req, res) {
	var email = req.body.email;
	var password = req.body.password;
  db.user.authenticate(email, password, function(err, user) {
  	if (err) {
  		res.send(err);
  	} else if (user) {
  		req.session.userId = user.id;
  		res.redirect("/");
  	} else {
  		res.send("Email and/or password invalid");
  	}
  });
});

router.get("/logout", function(req, res) {
	req.session.userId = false;
	res.redirect("/");
});

module.exports = router;










