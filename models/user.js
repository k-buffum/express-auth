'use strict';

var bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },


    // hooks run before we save data into data base
    hooks: {

      
      beforeCreate: function(user, options, callback) {

        // check to see if password exists in input field
        if (user.password) {

          // hashes password, 10 is representing how many time the password is salted with hash
          bcrypt.hash(user.password, 10, function(err, hash) {

            // if an error is returned the error is shown to the user
            if (err) return callback(err);

            // re-assigns password to hash if password was successfully hashed
            user.password = hash;

            // notify sequelize that the hash password is created and added to db
            // null is representing error, if no error the user is passed
            callback(null, user);
          });
        } else {
          callback(null, user);
        }
      }
    }
  });
  return user;
};