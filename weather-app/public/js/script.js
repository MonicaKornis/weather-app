let h1 = document.querySelector("h1");
console.log('hi');


let colors  = ['blue','red','green', 'orange','yellow', 'pink', 'red', 'black'];
function randomIndex() {
  console.log('executed');
  h1.style.color = colors[Math.floor(Math.random() * 8)];
}


h1.addEventListener('click',randomIndex);

let form = document.querySelector('form');
let input = document.querySelector('input');
let place = document.getElementById('place');
let forcast = document.getElementById('forcast');



form.addEventListener('submit', (e) => {
  console.log(form);
  e.preventDefault();
  console.log(e);

  let value = input.value;

  fetch(`http://localhost:3000/weather?address=${value}`).then((weatherData) => {
      if(value === undefined || value === '' || value.length > 5) {
        place.innerText = '';
        forcast.innerText = 'Cannot get data for location';
      }

      weatherData.json().then((jsonData) => {

        if(jsonData.location !== undefined && jsonData.forcast !== undefined){
          place.innerText = jsonData.location;
          forcast.innerText = jsonData.forcast;
        }
      }
    );
  });
});

// fetch()
