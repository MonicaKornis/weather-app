var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';

var sequelize = new Sequelize('WeatherApp', 'postgres', 'postgres', {
  dialect: 'postgres'
});

var models = {
  users: sequelize.import('./models/user.js'),
  places: sequelize.import('./models/places.js'),
  userPlaces: sequelize.import('./models.user_places')
};

Object.keys(models).forEach(function (modelName) {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.Sequelize = Sequelize;
models.sequelize = sequelize;

exports.default = models;
