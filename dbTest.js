var db = require("./models");

// Create a user
db.user.create({
	name: "Katlyn",
	email: "kb@gmail.com",
	password: "dogs"
}).then(function(user) {
	console.log(user.get());
	
	// Find a user
	db.user.findById(1).then(function(user) {
		console.log(user.get());
	});

});

