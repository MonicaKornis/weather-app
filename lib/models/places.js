module.exports = function (sequelize, DataTypes) {
  var Place = sequelize.define('place', {
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    longitude: DataTypes.INTEGER,
    latitude: DataTypes.INTEGER
  });

  return Place;
};
