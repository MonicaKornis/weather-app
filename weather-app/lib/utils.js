'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWeather = exports.geoCode = undefined;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var geoCode = exports.geoCode = function geoCode(location, callback) {

  var geoCodingAPI = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoibWtvcm5pcyIsImEiOiJjazFwY2ZkMGEwdnBjM2lwZzE0aDVldmx0In0.-7DNtBi8-QFuVSeM-vs5BA';

  (0, _request2.default)({ url: geoCodingAPI, json: true }, function (error, response, _ref) {
    var features = _ref.features;

    if (error) {
      callback('Unable to connect to Mapbox API', undefined); //we're passing the error to the callback -
      //the callback is the specialized function while geocode is very general - the callback will handle the error message
    } else if (features.length === 0 || features === undefined) {
      callback('Unable to get data for location', undefined);
    } else {

      var coords = features[0].center;

      callback(undefined, {
        latitude: coords[0],
        longitude: coords[1],
        location: features[0].place_name
      });
    }
  });
};

var getWeather = exports.getWeather = function getWeather(longitude, latitude, location, callback) {

  var url = 'https://api.darksky.net/forecast/aa0c94b5fe3d0fa4e730bd4660c72e93/' + longitude + ',' + latitude + '?units=si';

  (0, _request2.default)({ url: url, json: true }, function (error, response, _ref2) {
    var bodyError = _ref2.error,
        daily = _ref2.daily,
        currently = _ref2.currently;

    if (error) {
      callback('Cannot connect to Dark Sky API', undefined);
    } else if (bodyError) {
      callback('Cannot find data for specified location', undefined);
    } else {
      callback(undefined, { forcast: daily.summary + ' It is currently ' + currently.temperature + ' degrees out with a ' + currently.precipProbability + '% chance of rain', location: location });
    }
  });
};