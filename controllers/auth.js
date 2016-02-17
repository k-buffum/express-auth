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
  		res.send("User already exists");
  	}
  }).catch(function(err) {  // catches errors coming from sequelize
  	res.send(err);
  });
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.post('/login', function(req, res) {
  res.send(req.body);
});

module.exports = router;
