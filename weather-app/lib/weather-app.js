'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _utils = require('./utils');

var Utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var currentLocation = process.argv[2].split('=')[1];

Utils.geoCode(currentLocation, function (error, data) {

  if (error) {
    return console.log('Error Geocode: ' + error);
  }

  Utils.getWeather(data.longitude, data.latitude, function (err, forcast) {

    if (err) {
      console.log('Error Weather: ' + err);
    } else {
      console.log(data.placeName);
      console.log(data.forcast);
    }
  });
});