import { getMoviesBySearch, searchedMovies } from "./data/movies.js";
import { formatMovieRating } from "./utils/utils.js";

export function search() {
  // here we are getting the html element for the input box

  let inputTextBox = document.querySelector(".navbar-search-input");

  //   Every time we input a character the event is fired
  inputTextBox.addEventListener("input", async () => {
    // first changing the search button to close button
    document.querySelector(
      ".js-navbar-button"
    ).innerHTML = `<i class="fa-solid fa-xmark"></i>`;

    // making the result box visible
    document.querySelector(".js-search-result-box").style.display = "flex";

    // if query is not empty if are fetching the data from server
    let query = inputTextBox.value;
    if (query) {
      await getMoviesBySearch(query);
      generateSearchHTML();
    }
    // if query is empty  then close button will again change to search button
    else {
      document.querySelector(
        ".js-navbar-button"
      ).innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;

      //   making the result box hidden
      document.querySelector(".js-search-result-box").style.display = "none";
    }
  });

  //   when the button on the navbar is clicked
  document
    .querySelector(".js-navbar-button")
    .addEventListener("click", async () => {
      let resultBoxClosed =
        document.querySelector(".js-search-result-box").style.display ===
        "none";

      // if the search result box is closed then making it visible
      if (resultBoxClosed) {
        document.querySelector(".js-search-result-box").style.display = "flex";
      }

      //  if the box is already open then making the button a close button
      else {
        document.querySelector(
          ".js-navbar-button"
        ).innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;

        // changing the result box display hidden
        document.querySelector(".js-search-result-box").style.display = "none";
        inputTextBox.value = "";
      }
    });
}

// Function to render the result on the page
function generateSearchHTML() {
  let html = "";
  searchedMovies.forEach((movie) => {
    html += `<div class="result-container">
      <div class="result-movie-poster ">

        <img src="${movie.getPosterUrl()}" alt="">
      </div>
      <div class="result-movie-details">
        <div class="result-movie-title ">${movie.title}</div>
        <div class="result-movie-year">${movie.getMovieYear()}</div>
        <div class="result-movie-rating"> <i class="fa-solid fa-star movie-star"></i>${formatMovieRating(
          movie.rating
        )}</div>
      </div>
    </div>`;
  });

  document.querySelector(".js-search-result-box").innerHTML = html;
}
