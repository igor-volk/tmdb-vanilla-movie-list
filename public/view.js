import { searchMovies, getMovies } from "./services/movieService.js";

const isFavourite = (id, favourites) => {
  return favourites.includes(id);
}

const toPercentage = value => {
  return `${value * 10}%`;
}

const sortMovies = (sorting, movies) => {
  if(sorting === "none") {
    return movies;
  }

  const moviesToSort = [...movies];

  return moviesToSort.sort((a, b) => {
    if(a.vote_average > b.vote_average) {
      return -1;
    }

    if(a.vote_average < b.vote_average) {
      return 1;
    }

    return 0;
  });
}

export const renderMovies = () => {
  let html = "";
  const favourites = JSON.parse(localStorage.getItem("favourites"));
  sortMovies(window.sorting, window.movies).forEach(movie => {
    const favourite = isFavourite(movie.id, favourites);
    html += `<div class="movie">
      <div class="img-container">
        <div class="vote">${toPercentage(movie.vote_average)}</div>
        <img src="https://image.tmdb.org/t/p/h100${movie.poster_path}" />
      </div>
      <div class="description">
        <div class="title">${movie.title}<span class="year">(${movie.release_date})</span></div>
        <div class="overview">${movie.overview}</div>
      </div>
      <div class="divider-container">
        <div class="divider"></div>
      </div>
      <div class="cta">
        <button class="button--add-to-favourites${favourite ? ' favourite' : ''}" onclick="toggleFavourites(${movie.id})">&#10084;</button>
        <button class="button--more-info">More info</button>
      </div>
    </div>`
  });

  return html;
}

export const toggleFavourites = (id) => {
  const favourites = JSON.parse(localStorage.getItem("favourites"));
  if (isFavourite(id, favourites)) {
    localStorage.setItem("favourites", JSON.stringify(favourites.filter(fav => fav !== id)));
  } else {
    localStorage.setItem("favourites", JSON.stringify([...favourites, id]));
  }

  // if viewing favourites, and a movie is clicked, remove it from the list
  if(window.movieType === "Favourites") {
    const newFavourites = JSON.parse(localStorage.getItem("favourites"));
    window.movies = window.allMovies.filter(movie => isFavourite(movie.id, newFavourites));
  }

  renderUI();
}

export const renderUI = () => {
  const list = document.getElementsByClassName("movie-list")[0];
  list.innerHTML = renderMovies();
  const counterHeader = document.getElementsByClassName("counter-header")[0];
  counterHeader.innerHTML = window.movieType;
  const counterMessage = document.getElementsByClassName("counter-message")[0];
  counterMessage.innerHTML = `Showing ${window.movies.length} of a total of ${window.allMovies.length} movies`;
}

export const movieTypeChange = (value) => {
  if(value === 'favourites') {
    const favourites = JSON.parse(window.localStorage.getItem("favourites"));
    window.movies = window.allMovies.filter(movie => isFavourite(movie.id, favourites));
    window.movieType = "Favourites";
  } else if(value === 'all') {
    window.movies = window.allMovies;
    window.movieType = "All movies";
  }

  renderUI();
};

export const sortingChange = (value) => {
  window.sorting = value;
  renderUI();
}

export const searchChange = async (value) => {
  if (value.length > 0) {
    window.allMovies = window.movies = await searchMovies(value);
    window.movieType = "Search";
  } else {
    window.allMovies = window.movies = await getMovies();
  }

  renderUI();
}
