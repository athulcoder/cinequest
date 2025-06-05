import { getMovieDetails, singleMovieData } from "./data/movies.js";
import { search } from "./search.js";
import { formatMovieRating } from "./utils/utils.js";
let url = new URL(window.location.href);
let movieId = url.searchParams.get("movieId");

getMovieDetails(movieId).then(() => renderSingleMovieHTML());

function renderSingleMovieHTML() {
  let html = `
    <nav class="navbar">
      <div class="logo">CineQuest</div>

      <div class="navbar-search-box">
        <input
          placeholder="Search for Movies"
          class="navbar-search-input"
          type="text"
        />

        <button class="navbar-search-button">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </nav>

    <button class="back-button"><i class="fa-solid fa-arrow-left"></i></button>
    <section class="single-movie-container">
      <div class="single-movie-title">${singleMovieData.title}</div>
      <div class="single-movie-year">${singleMovieData.getMovieYear()}</div>
      <div class="single-movie-poster">
        <img src="${singleMovieData.getPosterUrl(
          singleMovieData.posterPath
        )}" alt="" />
      </div>

      <div class="single-movie-detail">
        <div>
          <div class="single-movie-language">${singleMovieData.getLanguage()}</div>
          <div class="single-movie-genre">${singleMovieData.genres
            .map((genre) => {
              return genre.name;
            })
            .join("-")
            .toLowerCase()}</div>
        </div>
        <div class="single-movie-rating">
          <i class="fa-solid fa-star movie-star"></i>
          <span>${formatMovieRating(singleMovieData.rating)}</span>
        </div>
      </div>

      <div class="single-movie-desc-box">
        <span>Description</span>
        <p class="single-movie-desc">
          ${singleMovieData.description}
        </p>
      </div>

     
    </section>
   
 


  `;

  document.body.innerHTML = html;
  document.querySelector(".back-button").addEventListener("click", () => {
    window.location.href = "./index.html";
  });

  search();
}
