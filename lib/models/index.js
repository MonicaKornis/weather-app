var _sequelize = require('sequelize');

var _sequelize = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; };

var fs = require('fs');
var path = require('path');

var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';


var sequelize = new _sequelize.default('WeatherApp', 'postgres', 'postgres', {
  dialect: 'postgres'
});


var models = {
  users: sequelize.import('./users.js'),
  places: sequelize.import('./places.js'),
  userPlaces: sequelize.import('./user_places')
};

Object.keys(models).forEach(function(modelName) {
       if (models[modelName].options.hasOwnProperty('associate')) {
         models[modelName].options.associate(models);
       }
     });

models.sequelize = sequelize;
models.Sequelize = _sequelize.default;

console.log(models);

exports.default = models;
