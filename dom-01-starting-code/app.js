const listItemElements = document.querySelectorAll("li");

for (const element of listItemElements) {
  console.log("element", element);
}

const h1 = document.getElementById("main-title");
h1.textContent = "Some new title";
h1.style.color = "white";
h1.style.backgroundColor = "red";

const li = document.querySelector("li:last-of-type");
li.textContent = li.textContent + "(Changed!)";

const body = document.body;
const ul = document.body.firstElementChild.nextElementSibling;

const firstLi = ul.firstElementChild;
console.log("firstLi", firstLi);

const section = document.querySelector("section");
const button = document.querySelector("button");
// selection.style.backgroundColor = "blue";
section.className = "red-bg";
button.addEventListener("click", () => {
  // if (section.className === "red-bg visible") {
  //   section.className = "red-bg invisible";
  // } else {
  //   section.className = "red-bg visible";
  // }

  // classList

  section.classList.toggle("invisible");
});
