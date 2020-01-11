module.exports = function (sequelize, DataTypes) {
  var Place = sequelize.define('place', {
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    longitude: DataTypes.NUMBER,
    latitude: DataTypes.NUMBER
  });

  return Place;
};
