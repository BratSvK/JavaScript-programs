const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");

const movies = [];

const renderMovies = (filter = "") => {
  const movieList = document.getElementById("movie-list");

  if (movies.length === 0) {
    movieList.classList.remove("visible");
  } else {
    movieList.classList.add("visible");
  }
  // bad performence better append each movie
  movieList.innerHTML = "";
  // filter our movies
  const filteredMovies = !filter ? movies : movies.filter((movie) => movie.info.title.includes(filter));

  filteredMovies.forEach((movie) => {
    const movieElement = document.createElement("li");
    const { info } = movie;
    // let text = info.title + "-";1
    // const { getFormmattedTitle } = movie;
    let text = movie.getFormmattedTitle() + " - ";

    //for in for keys in objects
    for (const key in info) {
      if (key !== "title" && key !== "_title") {
        text += `${key}: ${info[key]} `;
      }
    }

    movieElement.textContent = text;
    movieList.append(movieElement);
  });
};

const addMoiveHandler = () => {
  const title = document.getElementById("title").value;
  const extraName = document.getElementById("extra-name").value;
  const extraValue = document.getElementById("extra-value").value;

  //valid inputs
  if (title.trim() === "" || extraName.trim() === "" || extraValue.trim() === "") {
    return;
  }
  const newMovie = {
    info: {
      set title(val) {
        if (val.trim() === "") {
          this._title = "DEFAULT";
          return;
        }
        this._title = val;
      },

      get title() {
        return this._title;
      },
      [extraName]: extraValue,
    },
    id: Math.random(),
    getFormmattedTitle() {
      return this.info.title.toUpperCase();
    },
  };

  newMovie.info.title = title;
  console.log("addMoiveHandler -> newMovie", newMovie.info.title);
  


  movies.push(newMovie);
  renderMovies();
  console.log(newMovie);
};

const searchMovieHandler = () => {
  const filterTerm = document.getElementById("filter-title").value;
  renderMovies(filterTerm);
};

addMovieBtn.addEventListener("click", addMoiveHandler);
searchBtn.addEventListener("click", searchMovieHandler);
