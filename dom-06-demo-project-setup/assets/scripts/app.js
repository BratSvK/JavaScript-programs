const addBtn = document.querySelector("header button");
const modalWindow = document.getElementById("add-modal");
const backDrop = document.getElementById("backdrop");
const cancelBtn = modalWindow.querySelector("button");
const addConfirmBtn = cancelBtn.nextElementSibling;
const userInputs = modalWindow.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const listRoot = document.getElementById("movie-list");
const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];

const toggleBackgroundDrop = () => {
  backDrop.classList.toggle("visible");
};

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const cancelMovieDeletion = () => {
  deleteMovieModal.classList.remove("visible");
  toggleBackgroundDrop();
};

const deleteMovieHandler = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  listRoot.children[movieIndex].remove();
  cancelMovieDeletion();
  updateUI();
};

const startDeleteMovieHandler = (movieId) => {
  //show a backDrop are you sure
  deleteMovieModal.classList.add("visible");
  toggleBackgroundDrop();
  const cancelDeletionBtn = deleteMovieModal.querySelector(".btn--passive");
  let confirmDeletionBtn = deleteMovieModal.querySelector(".btn--danger");

  // vzdy mat nove btn na kazdu metodu 
  confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));
  //swap it
  confirmDeletionBtn = deleteMovieModal.querySelector(".btn--danger");
   

  // MUSIME VYMAZAT STARE LISTENERS
  // confirmDeletionBtn.removeEventListener("click",deleteMovieHandler.bind(null,movieId));  // will not work becouse of specific id 

  cancelDeletionBtn.removeEventListener("click", cancelMovieDeletion);


  cancelDeletionBtn.addEventListener("click", cancelMovieDeletion);
  confirmDeletionBtn.addEventListener("click", deleteMovieHandler.bind(null, movieId));
  //deleteMovie(movieId);
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
  newMovieElement.addEventListener("click", startDeleteMovieHandler.bind(null, id));
  listRoot.append(newMovieElement);
};

const showMovieModal = () => {
  modalWindow.classList.add("visible");
  toggleBackgroundDrop();
};

const closeMovieModal = () => {
  modalWindow.classList.remove("visible");
};

const closeModalWindowHandler = () => {
  closeMovieModal();
  resetInput();
  toggleBackgroundDrop();
};

const backdropClickHandler = () => {
  closeMovieModal();
  resetInput();
  cancelMovieDeletion();
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
  closeMovieModal();
  resetInput();
  toggleBackgroundDrop();
  renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
  updateUI();
};

addBtn.addEventListener("click", showMovieModal);
backDrop.addEventListener("click", backdropClickHandler);
cancelBtn.addEventListener("click", closeModalWindowHandler);
addConfirmBtn.addEventListener("click", addMovieHandler);
