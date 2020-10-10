// function randomIntBetween(min, max) { // min: 5, max: 10
//   return Math.floor(Math.random() * (max - min + 1)  + min); // => 10.9999999999 => 10
// }

// console.log(randomIntBetween(1,10));

// const inputElement = document.querySelector("input");

// const btnCase = document.querySelector("button");
// btnCase.addEventListener("click",() => {
//   inputElement.textContent = inputElement.value.toUpperCase();
//   inputElement.value = inputElement.textContent;
//   console.log(inputElement.textContent);
// });

function productDescription(strings, productName, productPrize) {
  return "This is a product!";
}
const prodName = "JavaScript Course";
const prodPrice = 29.99;
const productOutput = productDescription`This product (${prodName}) is ${prodPrice}`;
console.log(productOutput);
