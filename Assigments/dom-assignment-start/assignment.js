// task 1 select task and change color in 2 ways
//1.way
// const task1 = document.getElementById("task-1");
// task1.style.backgroundColor = "black";
// task1.style.color = "white";

//2. way
//const task1 = document.querySelector("li:first-of-type");
const task1 = document.querySelector("#task-1");
task1.style.backgroundColor = "black";
task1.style.color = "white";

//task 2
//1.way 
// const title = document.querySelector("title");
// title.textContent = "Assignment - Solved!";

//2.way
const head = document.head;
head.querySelector("title").textContent = "Assignment - Solved!";

//task 3
const h1 = document.querySelector("h1");
h1.textContent = "Assignment - Solved!";
