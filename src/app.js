import express from 'express';
import path from 'path';
import hbs from 'hbs';
import * as Utils from './utils';

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
app.get('/', (req,res) => {
  res.render('index', {
    title: 'Weather',
    author: 'Monica'
  }); //sends something back to the requestor
});

app.get('/help', (req,res) => {
  res.render('help', {
    title: 'Help',
    author: 'Monica',
    helpText: 'Frequent Questions'
  }); //sends something back to the requestor
});

app.get('/about', (req,res) => {
  // res.send('<h1>HELLO - It is me</h1>'); //sends something back to the requestor
  res.render('about', {
    title: 'About',
    author: 'Monica'
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
        console.log(data);
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

  // res.render('weather', {
  //   title: 'Current Weather',
  //   author: 'Monica',
  //   forcast: 'Today the high is 43 degrees with a low of 32. Right now the temperature is 35.',
  //   location: 'New York, NY'
  // });

  //we're using response.render to  render a template
});

app.get('/help/*', (req,res) => {
  res.render('404', {
    title: 'help',
    author: 'Monica'
  });
});

app.get('/about/*', (req,res) => {
  res.render('404', {
    title: 'about',
    author: 'Monica'
  });
});

app.get('/products', (req,res) =>  {
  if(!req.query.search) {
    return res.send( { error: 'must provide search term'});
    //we need  the return because otherwise we would be sending two responses - and we can only send  one response back
  }

  console.log(req.query.search);

  res.send({
    products: []
  });
});


app.get('*', (req, res) => {
  res.render('404', {
    author: 'Monica'
  });
}); //this needs to come last - bc matches are looked for in order - it will look for all of the routes in order
//if none match this will be executed. the star is a wild card character


app.listen(port, () => console.log('Server is listening on port ' + port));
