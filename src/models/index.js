// 'use strict';

var fs        = require('fs');
var path      = require('path');
import Sequelize from 'sequelize';
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
// var config    = require(__dirname + '/../config/config.js')[env];
var db        = {};

// if (config.use_env_variable) {
//   var sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   var sequelize = new Sequelize('WeatherApp', 'postgres', 'postgres', {
//     dialect: 'postgres'
//   });
// }

var sequelize = new Sequelize('WeatherApp', 'postgres', 'postgres', {
  dialect: 'postgres'
});

const models = {
  users: sequelize.import('./user.js'),
  places: sequelize.import('./places.js'),
  userPlaces: sequelize.import('./user_places')
};

Object.keys(models).forEach(modelName =>{
  if('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default models;
