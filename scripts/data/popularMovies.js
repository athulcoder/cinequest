import { Movie } from "./scripts/data/movies.js";

const apiKey = "6611e0fcfa7c8d1e9db14266919ca167";
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

let data;
const getMovies = async () => {
  let response = await fetch(url);

  data = await response.json();

  popularMovies = data.results.map((movie) => {
    return new Movie({
      id: movie.id,
      title: movie.title,
      releaseDate: movie.release_date,
      rating: movie.vote_average,
      poster: movie.poster_path,
      description: movie.overview,
      originalLanguage: movie.original_language,
      genreIds: movie.genre_ids,
    });
  });
};

getMovies().then(() => {
  console.log(data);
  popularMovies.forEach((id) => console.log(id));
});
