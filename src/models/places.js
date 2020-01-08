export default (sequelize, DataTypes) => {
  const Place = sequelize.define({
    city: DataTypes.string,
    country: DataTypes.string,
    longitude: DataTypes.number,
    latitude: DataTypes.number
  });
};
