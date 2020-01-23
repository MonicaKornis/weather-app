import express from 'express';
import path from 'path';
import hbs from 'hbs';
import * as Utils from './utils';
import models from './models';
import sequelize from 'Sequelize';

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../frontend/views');
const partialsPath = path.join(__dirname, '../frontend/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req,res) => {
  res.render('index', {
    title: 'Weather',
    author: 'Shiba Inu Incorporated'
  });
});

app.get('/help', (req,res) => {
  res.render('help', {
    title: 'Help',
    author: 'Shiba Inu Incorporated',
    helpText: 'Frequent Questions'
  }); //sends something back to the requestor
});

app.get('/about', (req,res) => {
  res.render('about', {
    title: 'About',
    author: 'Shiba Inu Incorporated'
  });
});

app.get('/weather', (req,res) => {
  if(!req.query.address) {
    res.send({
      error: 'Address query param is required'
    });
  } else {

    let sendData = (err, data) => {
      if(err) {
        res.send(err);
      } else {
        res.send({ title: 'Weather', forcast: data.forcast, address: req.query.address, location: data.location, temperatureMin: data.temperatureMin, temperatureMax: data.temperatureMax});
      }
    };
                                          //if  we dont default we might  recieve the cannot get logitude of  undefined error
    const getWeatherDataFromCoords = (err, {longitude, latitude =  0, location} = {}, callback) => { // {} = {} defaulting  to empty object if nothing is passed
      if(err) {                                //also setting a default property for lat
        res.send(err);
      } else {

        if(longitude !== undefined) {
          Utils.getWeather(longitude, latitude, location, sendData);
        } else {
          res.send({  error: 'Cannot get Mapbox Data'});
        }

      }

    };

  let geoData  = Utils.geoCode(req.query.address, getWeatherDataFromCoords);
}


});

app.get('/help/*', (req,res) => {
  res.render('404', {
    title: 'help',
    author: 'Shiba Inu Incorporated'
  });
});

app.get('/about/*', (req,res) => {
  res.render('404', {
    title: 'about',
    author: 'Shiba Inu Incorporated'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    author: 'Shiba Inu Incorporated'
  });
}); //this needs to come last - bc matches are looked for in order - it will look for all of the routes in order
//if none match this will be executed. the star is a wild card character

models.sequelize.sync().then(x => {
  app.listen(port, () => console.log('Server is listening on port ' + port));
});
