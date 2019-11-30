let name = 'Turbo Vaccum';
let price = '$123';
let productDescription = 'High tech vaccum featuring latest advancements in vaccum technology';

let product = {
  name,
  price,
  description: productDescription,
  availability: 'In stock'
};

//if the variable has the same name as the key in the object then you can use the shorthand

console.log(product);

//OBJECT DESCRUCTUING
//will create varaibles that are equal to the values on the propery object with the same name
let { releaseDate = 2019, decription, availability, rating, price: productPrice, } = product;
//rating will be undefined
//price will be  renamed as productPrice with the value of price on product object
//release date will have a default value of 2019 ONLY if there is not a property on the product object with the same name


//you can also destructure object as they are passed into a function

let functionCall = (type, {name, price}) => {
  console.log(price);
  console.log(type);
  console.log(name);
  //will only take the rating and price properties of the product object
};

functionCall('order', product);

// here is es6 syntax where this is defined:
	let cat = {
		name: `Chibi`,
		sayHi () {
			console.log(`Hi my name is ${this.name}`);
		}
	};

  cat.sayHi();

//remeber it is not defined like this
cat = {
    name: `Chibi`,
    sayHi:() => {
      console.log(`Hi my name is ${this.name}`);
    }
  };

  cat.sayHi();
