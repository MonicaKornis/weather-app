'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },

    email: {
      type: DataTypes.STRING,
      unique: true
    },

    password: DataTypes.STRING
  });
};