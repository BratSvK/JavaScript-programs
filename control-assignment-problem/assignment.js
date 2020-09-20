const randomNumber = Math.random(); // produces random number between 0 (including) and 1 (excluding)

// 1. task
if (randomNumber > 0.7) {
  alert("Number greater then 0.7");
}

//2. task -> create an array of numbers
const numberEntries = [1, 2, 3, 4, 5];

for (let index = numberEntries.length - 1; index >= 0; index--) {
  console.log(numberEntries[index]);
}

for (const number of numberEntries) {
  console.log(number);
}
// task4
const randomNumber2 = Math.random(); // produces random number between 0 (including) and 1 (excluding)
if((randomNumber > 0.7 && randomNumber2 > 0.7) || (randomNumber <= 0.2 || randomNumber2 <= 0.2)){
    alert('Ahoj');
}


