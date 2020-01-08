'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 'use strict';

var fs = require('fs');
var path = require('path');

var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';
// var config    = require(__dirname + '/../config/config.js')[env];
var db = {};

// if (config.use_env_variable) {
//   var sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   var sequelize = new Sequelize('WeatherApp', 'postgres', 'postgres', {
//     dialect: 'postgres'
//   });
// }

var sequelize = new _sequelize2.default('WeatherApp', 'postgres', 'postgres', {
  dialect: 'postgres'
});

var models = {
  users: sequelize.import('./user.js'),
  places: sequelize.import('./places.js'),
  userPlaces: sequelize.import('./user_places')
};

Object.keys(models).forEach(function (modelName) {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

db.sequelize = sequelize;
db.Sequelize = _sequelize2.default;

exports.default = models;