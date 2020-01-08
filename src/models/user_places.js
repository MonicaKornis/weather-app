export default (sequelize, DataTypes) => {
  const userPlaces = sequelize.define({
    type:  DataTypes.string
  });
};

// Place.belongsToMany('User',  { through: userPlaces });
