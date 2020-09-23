const addBtn = document.querySelector("header button");
const modalWindow = document.getElementById("add-modal");
const backDrop = document.getElementById("backdrop");
const cancelBtn = modalWindow.querySelector("button");
const addConfirmBtn = cancelBtn.nextElementSibling;
const userInputs = modalWindow.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const listRoot = document.getElementById("movie-list");

const movies = [];

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const deleteMovieHandler = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex,1);
  listRoot.children[movieIndex].remove();

};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  // set HTML content
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
    <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/5 stars</p>
    </div>
  `;
  newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));
  listRoot.append(newMovieElement);
};

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
    alert("Please enter valid inputs(rating 1 to 5)");
  }

  const newMovie = {
    id: Math.random().toString(), //only for this demo
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };

  movies.push(newMovie);
  console.log("movies: ", movies);
  toggleModalAddMovie();
  resetInput();
  renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
  updateUI();
};

addBtn.addEventListener("click", toggleModalAddMovie);
backDrop.addEventListener("click", backdropClickHandler);
cancelBtn.addEventListener("click", closeModalWindowHandler);
addConfirmBtn.addEventListener("click", addMovieHandler);
