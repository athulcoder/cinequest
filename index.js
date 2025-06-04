import {
  getMovies,
  popularMovies,
  upcomingMovies,
  nowPlayingMovies,
} from "./scripts/data/movies.js";

async function getAll() {
  await getMovies("popular");
  await getMovies("now_playing");
  await getMovies("upcoming");
  renderMovieHTML();
}

getAll();

function renderMovieHTML() {
  generateHTML(popularMovies, "popular");
  generateHTML(nowPlayingMovies.reverse(), "now-playing");
  generateHTML(upcomingMovies.reverse(), "upcoming");
}

function generateHTML(movieCollection, selector) {
  let movieHTML = "";
  movieCollection.forEach((movie) => {
    movieHTML += `
    <div class="movie-container">
          <div class="movie-poster">
            <img src="${movie.getPosterUrl()}" alt="" />
          </div>

          <div class="movie-title">${movie.title}</div>
          <div class="movie-details">
            <div class="movie-year">${movie.getMovieYear()}</div>
            <div class="movie-rating">${movie.rating}</div>
          </div>
        </div>
    
    `;
  });

  //   We are locating the html class here and changing the inner html to movie
  document.querySelector(`.js-${selector}-main-grid`).innerHTML = movieHTML;
}
