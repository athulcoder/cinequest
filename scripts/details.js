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

        <button class="navbar-search-button js-navbar-button">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </nav>

    <!-- search result box -->
    <section class="search-result-box js-search-result-box">
    </section>

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
        <div>Description</div>
        <p class="single-movie-desc">
          ${singleMovieData.description}
        </p>
      </div>

      
       <span class="single-movie-cast-title">Cast</span>
    <div class="single-movie-cast-box">
     
    </div>
     
    </section>
  `;

  document.body.innerHTML = html;
  document.title = `CineQuest | ${singleMovieData.title}`;
  document.querySelector(".back-button").addEventListener("click", () => {
    window.location.href = "./index.html";
  });

  generateCastHTML(singleMovieData);
  search();
}

async function generateCastHTML(movieData) {
  let html = "";

  let casts = await movieData.getImportantCast();

  casts.forEach((cast) => {
    html += `
  <div class="cast-box">
        <div class="cast-img-box">
          <img src="${cast.getProfileUrl()}" alt="" />
        </div>
        <div class="cast-name">${cast.name}</div>
  </div>
  
  `;
  });

  console.log(html);
  document.querySelector(".single-movie-cast-box").innerHTML = html;
}
