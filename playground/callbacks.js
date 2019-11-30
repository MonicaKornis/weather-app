setTimeout(()=>{console.log('calling back');},1000);

const names = ['name', 'name2'];

const filteredNames = names.filter((name) => name.length <= 4);

const geoCode = (address, callback) => {

  setTimeout(()=>{

    const data =  {
      lat: 0,
      long: 0
    };

  callback(data);
  },3000);
};

geoCode('New York',(data) => {
  console.log(`${data.lat}`);
});

const numberResult =  (num1,num2,callback) =>  {
  setTimeout(() => {
    let result = callback(num1,num2);
    console.log(result);
  },5000);
};

const add = (num1,num2) => {
  return num1 + num2;
};

const multiply = (num1,num2) => {
  return num1 * num2;
};

numberResult(1,3,add);
numberResult(2,3,multiply);
