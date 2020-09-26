// 1. task

const numbers = [10, 2, 4.5, 5, 6, 9, 3];

// filter greater than 5
const greaterThenFive = numbers.filter((number) => number > 5);
console.log("greater then 5", greaterThenFive);
// map every number to an object number on some property e.q num

// const numberEntries = numbers.map((number) => {
//   const numberEntry = { num: number };
//   return numberEntry;
// });
const numberEntries = numbers.map((number) => ({ num: number }));
console.log("numberEntries", numberEntries);

// reduce the array to a single number(*)
const multiplicatedAll = numbers.reduce((prev, curr) => prev * curr);
console.log("multiplicatedAll", multiplicatedAll);

// 2. task
const findMax = (...numbersEntry) => {
  let maxValue = numbersEntry[0];
  for (const number of numbersEntry) {
    if (number > maxValue) {
      maxValue = number;
    }
  }
  return maxValue;
};

console.log(findMax(...numbers));

// tweak min from 2. task

const findMaxAndMin = (...numbersEntry) => {
  let minValue = numbersEntry[0];
  let maxValue = numbersEntry[0];

  for (const number of numbersEntry) {
    if (number > maxValue) {
      maxValue = number;
    }
    if (number < minValue) {
      minValue = number;
    }
  }
  return [maxValue, minValue];
};

const [max, min] = findMaxAndMin(...numbers);
console.log("max,min", max, min);

// 4.task

const ids = new Set([1, 2, 3, 4]);
console.log("ids", ids);
const addToList = (id) => {
  if (ids.has(id)) {
    console.log("You have such a id in list already");
  } else {
    ids.add(id);
    console.log(`${id} was added`);
  }
};

addToList(6);
console.log(ids);
