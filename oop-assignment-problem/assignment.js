// task 1. create class with 3 prop title, lenght, price
class Course {
  constructor(_title, _length, _price) {
    this.title = _title;
    this.length = _length;
    this.priceValue = _price;
  }

  set priceValue(value) {
    // only positive values
    if (value && value > 0) {
      this.#price = value;
    } else {
        throw "Invalid value";
    }
  }

  get priceString() {
    return  "$" + this.#price;
  }

  // calculate length/price
  calculateLenghtPrice() {
    if (!this.length && !this.#price) {
      return;
    }
    return this.length / this.#price;
  }

  courseSummary() {
    const output = `Name of course: ${this.title}, legth: ${this.length}, price: ${this.priceString}`;
    return output;
  }
}

class PracticalCourse extends Course {
  constructor(_title, _length, _price, _numbOfExercises) {
    super(_title, _length, _price);
    this.numbOfExercises = _numbOfExercises;
  }

  courseSummary() {
    return super.courseSummary() + `\nnumber of exercices: ${this.numbOfExercises}`;
  }
}

class TheoreticalCourse extends Course {

  publish() {
    console.log("This is new topic for today");
  }
}

// task 4
// use getters and setters

// task 3 -------------------------------------------------

const practialCourse = new PracticalCourse("JavaScript", 10, 1, 5);
console.log(practialCourse.courseSummary());
practialCourse.calculateLenghtPrice();
console.log("What do you get:" + practialCourse.calculateLenghtPrice());
practialCourse.priceValue = 100;
console.log(practialCourse.courseSummary());

const teoreticalC = new TheoreticalCourse("Java", 20, 100);
console.log(teoreticalC.courseSummary());
teoreticalC.calculateLenghtPrice();
console.log("What do you get:" + teoreticalC.calculateLenghtPrice());
teoreticalC.publish();

// task 1-2 -----------------------------------------------
// const course1 = new Course("JavaScript", 50, 100);
// const course2 = new Course("Java", 50, 40);

// console.log("What do you get from this course: " + course1.calculateLenghtPrice());
// course1.courseSummary();

// console.log("What do you get from this course: " + course2.calculateLenghtPrice());
// course2.courseSummary();

// task 2. add two methods to the course class
// first calculate length/price (what you get for that price)
// another method output nice course summary(all info)

// task 3. more specialized, classes: PracticalCourse / TheoreticalCourse
// P -> numOfExercise prop
// T -> publish method
