import { getMoviesBySearch, searchedMovies } from "./data/movies.js";

export function search() {
  console.log("hello search");

  document.body.addEventListener("click", () => {
    let boxOpened =
      document.querySelector(".js-search-result-box").style.display === "flex";

    if (boxOpened) {
      document.querySelector(".js-search-result-box").style.display = "none";
    }
  });

  let inputTextBox = document.querySelector(".navbar-search-input");
  inputTextBox.addEventListener("input", () => {
    let boxOpened =
      document.querySelector(".js-search-result-box").style.display === "flex";

    if (!boxOpened) {
      document.querySelector(".js-search-result-box").style.display = "flex";
    } else {
      document.body.addEventListener("click", () => {
        console.log("hello");
        document.querySelector(".js-search-result-box").style.display = "none";
      });
    }
  });
  document
    .querySelector(".navbar-search-button")
    .addEventListener("click", async () => {
      if (inputTextBox.value) {
        await getMoviesBySearch(query);
        generateSearchHTML();
      }

      //
    });
}

function generateSearchHTML() {
  searchedMovies;
}
