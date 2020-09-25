// // // const number = [1, 2, 3];
// // // console.log("number", number);
// // // // other method to crete an array(empty)
// // // const moreNumbers = new Array(); // []
// // // console.log("moreNumbers", moreNumbers);
// // // //
// // // const listItems = document.querySelectorAll("li");
// // // console.log("listItems", listItems);

// // // const arrayListItems = Array.from(listItems);
// // // console.log("arrayListItems", arrayListItems);

// // // //what to store to an array
// // // const hobies = ["Cooking", "Sports"];
// // // const personalData = [30, "Max", { moreDetail: [] }];

// // // // multidimensional an array
// // // const analyticsData = [
// // //   [1, 1.6],
// // //   [-5.4, 2.1],
// // // ];

// // // for (const data of analyticsData) {
// // //   for (const dataPoints of data) {
// // //     console.log("dataPoints", dataPoints);
// // //
// // // }

// // // to add data to and array
// // // const hobies = ["Sports", "Cooking"];

// // // hobies.push("Reading");
// // // hobies.unshift("Coding");
// // // hobies.pop();
// // // hobies.shift();

// // // const removedItems = hobies.splice(1,1,"Ahoj");
// // // console.log("removedItems", removedItems)
// // // console.log("hobies", hobies);

// // // const testResults = [1, 2.3, 1.5, 10.99, -5, 10];
// // // //const storedResults = testResults.slice(0,2);

// // // const storedArray = testResults.concat([3.99, 2]);
// // // console.log("index of", storedArray.indexOf(1.5));
// // // console.log(storedArray, testResults);

// // // const personData = [{ name: "Max" }, { name: "Manuel" }];
// // // // find an object in array

// // // const manuel = personData.find((person, index, persons) => {
// // //   return person.name === "Manuel";
// // // });
// // // console.log("manuel", manuel);

// // const prices = [10.99, 5.99, 3.99, 6.59];

// // const tax = 0.19;

// // // for (const price of prices) {
// // //   taxAdjustedPrices.push(price * (1 + tax));
// // // }

// // const taxAdjustedPrices = prices.map((price, index, prices) => {
// //   const priceObj = { index: index, taxAdjPrice: price * (1 + tax) };
// //   return priceObj;
// // });

// // console.log(prices, taxAdjustedPrices);

// // const sortedPrices = prices.sort((a, b) => {
// //   if (a > b) {
// //     return 1;
// //   } else if (a === b) {
// //     return 0;
// //   } else {
// //     return -1;
// //   }
// // });
// // console.log("sortedPrices", sortedPrices.reverse());

// // // const filteredArray = prices.filter((price, index, prices) => {
// // //     return price > 6;
// // // });

// // const filteredArray = prices.filter((price) => price > 6);
// // console.log("filteredArray", filteredArray);

// // // let sum = 0;
// // // prices.forEach((price) => {
// // //   sum += price;
// // // });
// // // console.log("sum", sum);

// // const sum = prices.reduce((prevValue, currValue) => prevValue + currValue, 0);

// // // how to make sum on object on prices

// const pricesEntry = [{ price: 10 }, { price: 12.11 }, { price: 15 }];
// const pricesArray = pricesEntry.map((obj) => obj.price);
// console.log(pricesArray);

// const dataEntrys = [
//   { name: "Martin", age: 24 },
//   { name: "Pavol", age: 20 },
// ];
// console.log("dataEntrys", dataEntrys);

// const data = "new york;10.99;2000";
// const transformedData = data.split(";");
// console.log("transformedData", transformedData);

// const nameFragments = ["Max", "Schawrz"];

// const name = nameFragments.join(" ");
// console.log("name", name);

// const copiedNameFragments = [...nameFragments];
// console.log("copiedNameFragments", copiedNameFragments);
// nameFragments.push("Martin");

// console.log(Math.min(...pricesArray));

// const personsEntries = [
//   { name: "Max", age: 22 },
//   { name: "Martin", age: 23 },
// ];
// const copiedPersons = personsEntries.map((person) => ({ name: person.name, age: person.age }));
// personsEntries[0].age = 40;
// console.log(personsEntries, copiedPersons);

const nameData = ["Max", "Schwarz"];
// const firstName = nameData[0];
// const lastName = nameData[1];
const [firstName, lastName] = nameData;

const personData = [24, 11, 1998];
const [day, month, year] = personData;
console.log("day, month, year", day, month, year);
