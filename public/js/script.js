let h1 = document.querySelector("h1");

let colors  = ['blue','red','green', 'orange','yellow', 'pink', 'red', 'black'];
function randomIndex() {
  console.log('executed');
  h1.style.color = colors[Math.floor(Math.random() * 8)];
}


h1.addEventListener('click',randomIndex);

let form = document.querySelector('form');
let input = document.querySelector('input');
let place = document.getElementById('place');
let forcastParagraph = document.getElementById('forcast');
let currentData = document.getElementById('currentData');



form.addEventListener('submit', (e) => {
  console.log(form);
  e.preventDefault();
  console.log(e);

  let value = input.value;

  fetch(`/weather?address=${value}`).then((weatherData) => {
      if(value === undefined || value === '' || value.length > 5) {
        place.innerText = '';
        forcastParagraph.innerText = 'Cannot get data for location';
      }

      weatherData.json().then((data) => {

        if(data.location !== undefined && data.forcast !== undefined){
          place.innerText = data.location;
          forcastParagraph.innerText = data.forcast;
          currentData.innerText = `Today had a high of ${data.temperatureMax} and a low of ${data.temperatureMin}`;
        }
      }
    );
  });
});

// fetch()
