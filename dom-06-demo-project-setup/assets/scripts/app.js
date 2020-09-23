const addBtn = document.querySelector("header button");
const modalWindow = document.getElementById("add-modal");
const backDrop = document.getElementById("backdrop");
const cancelBtn = modalWindow.querySelector("button");
const addConfirmBtn = cancelBtn.nextElementSibling;
const userInputs = modalWindow.querySelectorAll("input");

const toggleBackgroundDrop = () => {
  backDrop.classList.toggle("visible");
};

const toggleModalAddMovie = () => {
  modalWindow.classList.toggle("visible");
  toggleBackgroundDrop();
};

const closeModalWindowHandler = () => {
  toggleModalAddMovie();
  resetInput();
};

const backdropClickHandler = () => {
  toggleModalAddMovie();
  resetInput();
};

const resetInput = () => {
    for (const input of userInputs) {
        input.value = "";
    }
};
// to be consistent handler to eventListeners
const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;
  if (titleValue.trim() === "" || imageUrlValue.trim() === "" || ratingValue.trim() === "" || +ratingValue < 1 || +ratingValue > 5) {
      alert("Please enter valid inputs(rating 1 to 5)")
  }
};

addBtn.addEventListener("click", toggleModalAddMovie);
backDrop.addEventListener("click", backdropClickHandler);
cancelBtn.addEventListener("click", closeModalWindowHandler);
addConfirmBtn.addEventListener("click", addMovieHandler);
