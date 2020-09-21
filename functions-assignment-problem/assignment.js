// //1. rewrite as an arrow function

// const sayHello = (name) => console.log("Hi " + name);

// sayHello("Martin");

// // 2. three diferent sytanx
// const DEFAULT_VALUE_STRING = "Ahoj toto je deafult";

// const sayHello = (name, saySomething = DEFAULT_VALUE_STRING) => {
//   console.log(`${saySomething} ${name}`);
// };
// const sayHello = () => {
//   console.log("Hi " + "Martin");
// };

// const sayHello = (name) => "Hi" + name;

// function checkInput(cb, ...stringsList) {
//   let hasEmptyText = false;
//   for (const text of stringsList) {
//     if (!text) {
//       hasEmptyText = true;
//       break;
//     }
//   }
//   if (!hasEmptyText) {
//     cb();
//   }
// }

function checkBadDay(cb, ...numbers) {
  let hasBadNumber = false;
  for (const num of numbers) {
    if (isNaN(num)) {
      hasBadNumber = true;
      break;
    }
  }
  if (!hasBadNumber) {
    cb();
  }
}

checkBadDay(
  () => {
    console.log("same spravne cisla");
  },
  1,
  3,
  "Martin",
  5
);
