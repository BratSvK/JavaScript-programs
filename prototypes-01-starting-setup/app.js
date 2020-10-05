class AgePerson {
  printAge() {
    console.log(this.age);
  }
}

class Person extends AgePerson {
  name = "MAX";

  constructor() {
    super();
    this.age = 30;
  }

  greet() {
    console.log(`Hi, I am ${this.name} and I am ${this.age} years old.`);
  }
}

// function Person() {
//   this.age = 30;
//   this.name = "MAX";
//   this.greet = function () {
//     console.log(`Hi, I am ${this.name} and I am ${this.age} years old.`);
//   };
// }

// Person.prototype = {
//   printAge() {
//     console.log(this.age);
//   },
// };

// console.dir(AgePerson);

// const person = new Person();
// console.log("person", person.__proto__);
// person.greet();
// person.printAge();

// const person = new Person();
// console.log("person", person);

const course = {
  title: "JavaScript - The Complete Guide",
  rating: 5,
};
// adding prototype after creation of objects
//Object.getPrototypeOf(course);
//console.log(Object.getPrototypeOf(course));
Object.setPrototypeOf(course, {
    // get prototype
    // ...Object.getPrototypeOf(course),
    printRating: function() {
        console.log(`${this.rating}/5`);
    }
});

const student = Object.create({printProgress: function () {
    console.log("Ahoj");
}});


Object.defineProperty(student,"adress", {
    configurable = true,
    enumerable: true,
    value: "STUROVA",
    writable: false
})


console.log(course.__proto__);
course.printRating();
console.log(student);
//course.printRating();
