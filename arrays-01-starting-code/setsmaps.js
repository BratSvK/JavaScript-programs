// const ids = new Set([1, 2, 3 ]);
// ids.add(2);
// console.log("ids", ids);

// const wordsEntries = new Set(["flutter", "asssumption"]);
// console.log(wordsEntries);
// for (const word of wordsEntries.values()) {
//     console.log(word);
//     }

// maps

const person1 = { name: "Max" };
const person2 = { name: "Manuel" };

//const personData = new Map([["key", "some value"]]);
const personData = new Map([[person1, [{ date: "yesterday", price: 10 }]]]);

personData.set(person2, [{ data: "two weeks ago", price: 100 }]);
console.log("personData", personData);
console.log("personData", personData.get(person1));


