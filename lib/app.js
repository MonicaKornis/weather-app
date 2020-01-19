'use strict';

require('dotenv').config();

var _express = require('express');

var Sequelize = require('sequelize');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _hbs = require('hbs');

var _hbs2 = _interopRequireDefault(_hbs);

var _utils = require('./utils');

var Utils = _interopRequireWildcard(_utils);

var _models = require('./models/index.js');

var _models2 = _interopRequireDefault(_models);

var _Sequelize = require('Sequelize');

var _Sequelize2 = _interopRequireDefault(_Sequelize);

var session = require('express-session');

var qs = require('querystring');

const url = require('url');

var randomString = require('randomstring');

var crfString =  randomString.generate();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT || 3000;
const redirect_uri = process.env.HOST + '/redirect';

var publicDirectoryPath = _path2.default.join(__dirname, '../public');
var viewsPath = _path2.default.join(__dirname, '../frontend/views');
var partialsPath = _path2.default.join(__dirname, '../frontend/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
_hbs2.default.registerPartials(partialsPath);

// Setup static directory to serve
app.use(_express2.default.static(publicDirectoryPath));

app.use(session({
  secret: randomString.generate(),
  cookie: { maxAge: 60000 },
  resave: false,
  uninitialized: false
}));

//callback has request object sent in and response
app.get('/', function (req, res) {
  res.render('main', {
    title: 'Weather',
    author: 'Shiba Inu Incorporated',
    email: ''
  }); //sends something back to the requestor
});

app.get('/redirect', function (req, res) {
  console.log('Request from Github:');
  console.log(req.query);

  const code  =  req.query.code;
  const state = req.query.state;

  if(req.session.csrf_string === state) {
    req.post({ url: 'https://github.com/login/oauth/access_token?' + qs.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.client_secret,
      code: code,
      redirect_uri: redirect_uri,
      state: req.session.csrf_string
    })});
  }

  (error, response, body) => {
    console.log('Your access token:');
    
  };
});

app.get('/login', function (req, res, next) {
  req.session.csrf_string =  randomString.generate();

  console.log(process.env.CLIENT_ID);

  let githubQueryString  =  qs.stringify({
    client_id: process.env.CLIENT_ID,
    redirect_uri: redirect_uri,
    state: req.session.csrf_string,
    scope: 'user:email'
  });

  const gitHubAuthURL = `https://github.com/login/oauth/authorize?` + githubQueryString;

  res.redirect(gitHubAuthURL);

});

app.get('/index', function (req, res) {
  res.render('index', {
    title: 'Weather',
    author: 'Shiba Inu Incorporated'
  }); //sends something back to the requestor
});

app.get('/help', function (req, res) {
  res.render('help', {
    title: 'Help',
    author: 'Shiba Inu Incorporated',
    helpText: 'Frequent Questions'
  }); //sends something back to the requestor
});

app.get('/main', function (req, res) {
  // res.send('<h1>HELLO - It is me</h1>'); //sends something back to the requestor
  res.render('about', {
    title: 'About',
    author: 'Shiba Inu Incorporated'
  });
});

app.get('/weather', function (req, res) {
  if (!req.query.address) {
    res.send({
      error: 'Address query param is required'
    });
  } else {

    var sendData = function sendData(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send({ title: 'Weather', forcast: data.forcast, address: req.query.address, location: data.location, temperatureMin: data.temperatureMin, temperatureMax: data.temperatureMax });
      }
    };
    //if  we dont default we might  recieve the cannot get logitude of  undefined error
    var getWeatherDataFromCoords = function getWeatherDataFromCoords(err) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          longitude = _ref.longitude,
          _ref$latitude = _ref.latitude,
          latitude = _ref$latitude === undefined ? 0 : _ref$latitude,
          location = _ref.location;

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
});

app.get('/help/*', function (req, res) {
  res.render('404', {
    title: 'help',
    author: 'Shiba Inu Incorporated'
  });
});

app.get('/about/*', function (req, res) {
  res.render('404', {
    title: 'about',
    author: 'Shiba Inu Incorporated'
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
    author: 'Shiba Inu Incorporated'
  });
}); //this needs to come last - bc matches are looked for in order - it will look for all of the routes in order
//if none match this will be executed. the star is a wild card character

var sequelize = new Sequelize('weatherapp', 'postgres', 'postgres', {
  dialect: 'postgres'
});

var models = {
  users: sequelize.import('./models/users.js'),
  places: sequelize.import('./models/places.js'),
  userPlaces: sequelize.import('./models/user_places')
};

Object.keys(models).forEach(function (modelName) {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.Sequelize = Sequelize;
models.sequelize = sequelize;

models.sequelize.sync().then(function (x) {
  app.listen(port, function () {
    return console.log('Server is listening on port ' + port);
  });
});
