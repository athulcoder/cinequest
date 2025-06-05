import {
  popularMovies,
  upcomingMovies,
  nowPlayingMovies,
  topRatedMovies,
  getMovies,
} from "./data/movies.js";

import { search } from "./search.js";
import { formatMovieRating } from "./utils/utils.js";
async function getAll() {
  await getMovies("popular");
  await getMovies("top_rated");
  await getMovies("now_playing");
  await getMovies("upcoming");
  renderMovieHTML();
  search();
}

getAll();

function renderMovieHTML() {
  generateHTML(popularMovies, "popular");
  generateHTML(topRatedMovies, "top-rated");
  generateHTML(nowPlayingMovies.reverse(), "now-playing");
  generateHTML(upcomingMovies.reverse(), "upcoming");
}

function generateHTML(movieCollection, selector) {
  let movieHTML = "";
  movieCollection.forEach((movie) => {
    movieHTML += `
    <div class="movie-container js-movie-container" data-movie-id="${movie.id}">
          <div class="movie-poster">
            <img src="${movie.getPosterUrl()}" alt="" />
          </div>

          <div class="movie-title">${movie.title}</div>
          <div class="movie-details">
            <div class="movie-year">${movie.getMovieYear()}</div>
            <div class="movie-rating"> <i class="fa-solid fa-star movie-star"></i>${formatMovieRating(
              movie.rating
            )}</div>
          </div>
        </div>
    
    `;
  });
  //   We are locating the html class here and changing the inner html to movie

  document.querySelector(`.js-${selector}-main-grid`).innerHTML = movieHTML;

  // Adding event listener to each movie container
  let movieButtons = document.querySelectorAll(".js-movie-container");

  movieButtons.forEach((button) => {
    let movieId = button.dataset.movieId;
    button.addEventListener("click", () => {
      window.location.href = `./details.html?movieId=${movieId}`;
    });
  });
}
