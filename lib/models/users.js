// var Sequelize = require('sequelize');
module.exports = function (sequelize, Sequelize) {
  var User = sequelize.define('user', {
    username: {
      type: Sequelize.STRING,
      unique: true
    },

    email: {
      type: Sequelize.STRING,
      unique: true
    },

    password: Sequelize.STRING
  });

  return User;
};
