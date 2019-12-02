import request from  'request';
import * as Utils from './utils';

let currentLocation = process.argv[2].split('=')[1];

Utils.geoCode(currentLocation,(error, data) => {

  if(error) {
    return console.log(`Error Geocode: ${error}`);
  }

  Utils.getWeather(data.longitude, data.latitude, (err,forcast) => {

    if(err) {
      console.log(`Error Weather: ${err}`);
    } else {
      console.log(data.placeName);
      console.log(data.forcast);
    }

  });
});
