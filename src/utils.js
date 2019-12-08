import request from  'request';

export const geoCode = (location,callback) => {

  const geoCodingAPI = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoibWtvcm5pcyIsImEiOiJjazFwY2ZkMGEwdnBjM2lwZzE0aDVldmx0In0.-7DNtBi8-QFuVSeM-vs5BA`;

  request({ url: geoCodingAPI, json: true}, (error, response, {features} ) => {
      if(error) {
        callback('Unable to connect to Mapbox API', undefined); //we're passing the error to the callback -
        //the callback is the specialized function while geocode is very general - the callback will handle the error message
      } else if (features.length === 0 || features  === undefined){
        callback('Unable to get data for location', undefined);
      } else {

        let coords = features[0].center;

        callback(undefined, {
          latitude: coords[0],
          longitude:coords[1],
          location: features[0].place_name
        });
      }
  });
};

export const getWeather = (longitude,latitude, location, callback) => {

   let url = `https://api.darksky.net/forecast/aa0c94b5fe3d0fa4e730bd4660c72e93/${longitude},${latitude}`;

   request({url, json: true},(error, response, {error:bodyError, daily, currently}) => {
     if(error) {
       callback('Cannot connect to Dark Sky API', undefined);
     } else if (bodyError) {
       callback('Cannot find data for specified location', undefined);
     } else {
       console.log(daily);
       callback(undefined, { forcast: `${daily.summary} It is currently ${currently.temperature} degrees out with a ${currently.precipProbability}% chance of rain`, location: location, temperatureMin: daily.data[0].temperatureMin, temperatureMax: daily.data[0].temperatureMax});
     }
   });
};
