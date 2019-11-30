const fs = require('fs');

const book = {
  title: '3666',
  author: 'Roberto Bolano'
};

let id, moonPhase, zodiacSign = 123; //all are assigned as 123


//can format if statements like so
if (
  id === 123 &&
  moonPhase === 'Waning Gibbous' &&
  zodiacSign === 'Libra'
) {
  alert('spooky');
}

const bookJson = JSON.stringify(book);
//converts to object JSON string

console.log(bookJson);
//book json is a string not an object
const parsedData = JSON.parse(bookJson);


console.log(parsedData);


// let dataBuffer = fs.readFileSync('1-json.json'); //what comes back is not a string -it's a buffer
// console.log(dataBuffer); //Bits and bytes represending  the Json data
// console.log(dataBuffer.toString());
// // fs.writeFileSync()
// let fileData = JSON.parse(dataBuffer.toString());
// console.log(fileData.title);

let dataBuffer = fs.readFileSync('1-json.json');
let jsonData = JSON.parse(dataBuffer.toString());
jsonData.name = 'Monica';
jsonData.age = 27;
jsonData = JSON.stringify(jsonData);

fs.writeFile('1-json.json', jsonData, (err) => {
  console.log(err);
});

const tasks = {
    tasks: [{
        text: 'Grocery shopping',
        completed: true
    },{
        text: 'Clean yard',
        completed: false
    }, {
        text: 'Film course',
        completed: false
    },
    {
        text: 'Film course2',
        completed: true
    }],

    getTasksToDo () {
      let todos = this.tasks.filter((task) => task.completed === false);
      return todos;
    }
};

console.log(tasks.getTasksToDo());
