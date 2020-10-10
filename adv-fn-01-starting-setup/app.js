function add(num1, num2) {
  return num1 + num2;
}

console.log(add(1, 5));

function addRandom(num1) {
  return num1 + Math.random();
}

console.log(addRandom(1));

// factory

function createTaxCalculator(tax) {
  function calculateTax(amount) {
    return amount * tax;
  }
  return calculateTax;
}

// const vatAmount = calculateTax(100, 0.19);
// const incomeTax = calculateTax(100, 0.25);

const calculateVatAmount = createTaxCalculator(0.19);
const calcuclateIncomeTaxAmount = createTaxCalculator(0.25);
console.log(calculateVatAmount(100));
console.log(calcuclateIncomeTaxAmount(200));

//closure
let userName = "Max";
function greetUser() {
  //let name = "Anna";

  console.log("Hi " + name);
}

let name = "Maximilian";
userName = "Manuel";

greetUser();

//recursion

// function powerOf(x, n) {
//   let result = 1;
//   for (let index = 0; index < n; index++) {
//     result *= x;
//   }
//   return result;
// }

function powerOf(x, n) {
  //   if (n === 1) {
  //     return x;
  //   }
  //   return x * powerOf(x, n - 1);

  return n === 1 ? x : x * powerOf(x, n - 1);
}
console.log(powerOf(2, 3));

const myself = {
  name: "Max",
  friends: [
    {
      name: "Manuel",
      friends: [
        {
          name: "Chris",
        },
      ],
    },
    {
      name: "Julia",
    },
  ],
};

function getFriendNames(person) {
  const collectedNames = [];

  if (!person.friends) {
    return [];
  }

  for (const friend of person.friends) {
    collectedNames.push(friend.name);
    collectedNames.push(...getFriendNames(friend));
  }
  return collectedNames;
}

// console.log(getFriendNames(myself));

// function factiorial(n) {
//   let result = 1;
//   let initialValue = 0;

//   for (let i = n; i > 0; i--) {

//       if (n === i ){
//         initialValue = i * (i - 1);
//       } else if(n!== i && (i - 1) > 0) {
//           initialValue *= i-1;
//       }

//   }

//   result = initialValue;
//   return result;
// }

// user recursion

function factorial(n) {
  //     if(n === 1) {
  //         return 1;
  //     }
  // return n * factorial(n-1);
  return n === 1 ? 1 : n * factorial(n - 1);
}

// 0, 1,1,2
function postupnost() {
  var i;
  var fib = []; // Initialize array!

  fib[0] = 0;
  fib[1] = 1;
  for (i = 2; i <= 10; i++) {
    // Next fibonacci number = previous + one before previous
    // Translated to JavaScript:
    fib[i] = fib[i - 2] + fib[i - 1];
    console.log(fib[i]);
  }
}

function fiboRec(n) {
  if (n <= 1) {
    return 1;
  }
  return fiboRec(n - 1) + fiboRec(n - 2);
}

console.log(factorial(5));
console.log(fiboRec(4));
