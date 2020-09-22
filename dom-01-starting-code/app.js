const listItemElements = document.querySelectorAll("li");

for (const element of listItemElements) {
  console.log("element", element);
}

const h1 = document.getElementById("main-title");
h1.textContent = "Some new title";
h1.style.color = "white";
h1.style.backgroundColor = "red";


const li = document.querySelector("li:last-of-type");
li.textContent =  li.textContent + "(Changed!)";

const body = document.body;
