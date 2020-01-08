"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Place = sequelize.define({
    city: DataTypes.string,
    country: DataTypes.string,
    longitude: DataTypes.number,
    latitude: DataTypes.number
  });
};