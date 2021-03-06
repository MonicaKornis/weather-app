// var Sequelize = require('sequelize');
module.exports = function (sequelize, Sequelize) {
  var User = sequelize.define('user', {
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },

    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },

    password: Sequelize.STRING
  });

  return User;
};
