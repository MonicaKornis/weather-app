"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var userPlaces = sequelize.define({
    type: DataTypes.string
  });
};

// Place.belongsToMany('User',  { through: userPlaces });