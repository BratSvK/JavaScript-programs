const button = document.querySelector("button");

// button.onclick = () => {

// };

const buttonClickHandler = (event) => {
  // event.target.disabled = true;
  console.log("buttonClickHandler -> true", true);
  console.log("buttonClickHandler -> buttonClickHandler", buttonClickHandler);
};

const anotherButtonClickHandler = () => {
  console.log("Button was clicked");
};

// button.onclick = buttonClickHandler;

// setTimeout(() => {
//   button.removeEventListener("click", buttonClickHandler.bind(this));
// }, 2000);

// buttons.forEach( btn => {
// btn.addEventListener("click", buttonClickHandler);
// });

// window.addEventListener("scroll", (event) => {
// console.log(event);
// });

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
});

const div = document.querySelector("div");
div.addEventListener("click", (event) => {
  console.log("CLICKED DIV");
  console.log("event", event);
});

button.addEventListener("click", (event) => {
  event.stopPropagation();
  console.log("CLICKED BUTTON");
  console.log("event", event);
  console.log(this);
});

const listItems = document.querySelectorAll("li");
const list = document.querySelector("ul");

// listItems.forEach((listItem) => {
//   listItem.addEventListener("click", (event) => {
//     event.target.classList.toggle("highlight");
//   });
// });
list.addEventListener("click", (event) => {
  //event.target.classList.toggle("highlight");
  event.target.closest("li").classList.toggle("highlight");
  form.submit();
});
