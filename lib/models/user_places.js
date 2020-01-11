module.exports = function (sequelize, DataTypes) {
  var userPlaces = sequelize.define('userPlace', {
    type: DataTypes.STRING
  });

  return userPlaces;
};

// Place.belongsToMany('User',  { through: userPlaces });
