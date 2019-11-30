import https from 'https';

const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoibWtvcm5pcyIsImEiOiJjazFwY2ZkMGEwdnBjM2lwZzE0aDVldmx0In0.-7DNtBi8-QFuVSeM-vs5BA`;

https.request(url, (response) => {

});
