
let utilsVar =  'this is the Utils file';

let add = (num1,num2) =>  {
  return num1+num2;
};

console.log(utilsVar);
console.log(module);
console.log('\n');
console.log(module.id);

console.log(module.exports);

export default add;
//module.exports is the object that is returned when you import this file /when
//it is 'required ' in another
