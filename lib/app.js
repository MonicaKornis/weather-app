'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _hbs = require('hbs');

var _hbs2 = _interopRequireDefault(_hbs);

var _utils = require('./utils');

var Utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT || 3000;

var publicDirectoryPath = _path2.default.join(__dirname, '../public');
var viewsPath = _path2.default.join(__dirname, '../frontend/views');
var partialsPath = _path2.default.join(__dirname, '../frontend/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
_hbs2.default.registerPartials(partialsPath);

// Setup static directory to serve
app.use(_express2.default.static(publicDirectoryPath));

// const app = express();
//
// // const currentDirectory = __dirname; //path to current directory
// // const filePath = __filename; //path to file
//
// const finalPath = path.join(__dirname, '../public'); //path to directory combined  with the relative path to frontend
// const partialsPath = path.join(__dirname, '../frontend/partials');
// const viewPath = path.join(__dirname, '../frontend/views');
//
// console.log(finalPath);
//
// //setup handlebars engine and views location
// app.set('view engine', 'hbs');
// app.use(express.static(finalPath));
// app.set('views', viewPath); //setting views to the path to the frontend directory
// hbs.registerPartials(partialsPath); //a quick way to load all partials from a particular directory

//setup static directory to serve
// app.use(express.static(finalPath)); //app.use is a way to customize your server

//callback has request object sent in and response
app.get('/', function (req, res) {
  res.render('index', {
    title: 'Weather',
    author: 'Monica'
  }); //sends something back to the requestor
});

app.get('/help', function (req, res) {
  res.render('help', {
    title: 'Help',
    author: 'Monica',
    helpText: 'Frequent Questions'
  }); //sends something back to the requestor
});

app.get('/about', function (req, res) {
  // res.send('<h1>HELLO - It is me</h1>'); //sends something back to the requestor
  res.render('about', {
    title: 'About',
    author: 'Monica'
  });
});

app.get('/weather', function (req, res) {
  if (!req.query.address) {
    res.send({
      error: 'Address query param is required'
    });
  } else {

    var sendData = function sendData(err, _ref) {
      var forcast = _ref.forcast,
          address = _ref.address,
          location = _ref.location,
          temperatureMax = _ref.temperatureMax,
          temperatureMin = _ref.temperatureMin;

      if (err) {
        res.send(err);
      } else {
        res.send({ title: 'Weather', forcast: forcast, address: req.query.address, location: location, temperatureMin: temperatureMin, temperatureMax: temperatureMax });
      }
    };
    //if  we dont default we might  recieve the cannot get logitude of  undefined error
    var getWeatherDataFromCoords = function getWeatherDataFromCoords(err) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          longitude = _ref2.longitude,
          _ref2$latitude = _ref2.latitude,
          latitude = _ref2$latitude === undefined ? 0 : _ref2$latitude,
          location = _ref2.location;

      var callback = arguments[2];
      // {} = {} defaulting  to empty object if nothing is passed
      if (err) {
        //also setting a default property for lat
        res.send(err);
      } else {

        if (longitude !== undefined) {
          Utils.getWeather(longitude, latitude, location, sendData);
        } else {
          res.send({ error: 'Cannot get Mapbox Data' });
        }
      }
    };

    var geoData = Utils.geoCode(req.query.address, getWeatherDataFromCoords);
  }

  // res.render('weather', {
  //   title: 'Current Weather',
  //   author: 'Monica',
  //   forcast: 'Today the high is 43 degrees with a low of 32. Right now the temperature is 35.',
  //   location: 'New York, NY'
  // });

  //we're using response.render to  render a template
});

app.get('/help/*', function (req, res) {
  res.render('404', {
    title: 'help',
    author: 'Monica'
  });
});

app.get('/about/*', function (req, res) {
  res.render('404', {
    title: 'about',
    author: 'Monica'
  });
});

app.get('/products', function (req, res) {
  if (!req.query.search) {
    return res.send({ error: 'must provide search term' });
    //we need  the return because otherwise we would be sending two responses - and we can only send  one response back
  }

  console.log(req.query.search);

  res.send({
    products: []
  });
});

app.get('*', function (req, res) {
  res.render('404', {
    author: 'Monica'
  });
}); //this needs to come last - bc matches are looked for in order - it will look for all of the routes in order
//if none match this will be executed. the star is a wild card character


app.listen(port, function () {
  return console.log('Server is listening on port ' + port);
});