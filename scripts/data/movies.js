import iso6391 from "https://esm.sh/iso-639-1";
class Movie {
  id;
  title;
  releaseDate;
  rating;
  posterPath;
  originalLanguage;
  description;
  genreIds;
  genres;

  constructor(movieDetails) {
    this.id = movieDetails.id;
    this.title = movieDetails.title;
    this.releaseDate = movieDetails.releaseDate;
    this.rating = movieDetails.rating;
    this.posterPath = movieDetails.posterPath;
    this.description = movieDetails.description;
    this.originalLanguage = movieDetails.originalLanguage;
    this.genreIds = movieDetails.genreIds;
    this.genres = movieDetails.genres;
  }

  getPosterUrl() {
    const posterBaseUrl = "https://image.tmdb.org/t/p/w500";
    const posterUrl = `${posterBaseUrl}${this.posterPath}`;
    return posterUrl;
  }

  getMovieYear() {
    let date = new Date(this.releaseDate);
    let year = date.getFullYear();
    return year;
  }
  getLanguage() {
    let lang = iso6391.getName(this.originalLanguage);
    return lang;
  }
}

const apiKey = "6611e0fcfa7c8d1e9db14266919ca167";

export let singleMovieData;
// Global Arrays of movies
export let popularMovies = [];
export let nowPlayingMovies = [];
export let upcomingMovies = [];

// Function to fetch movies data from server
export let getMovies = async (type) => {
  const url = `https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}`;

  console.log(url);
  let response = await fetch(url);

  let data = await response.json();

  let moviesCollection = data.results.map((movie) => {
    return new Movie({
      id: movie.id,
      title: movie.title,
      releaseDate: movie.release_date,
      rating: movie.vote_average,
      posterPath: movie.poster_path,
      description: movie.overview,
      originalLanguage: movie.original_language,
      genreIds: movie.genre_ids,
      genres: movie.genres,
    });
  });
  if (type === "popular") {
    console.log(moviesCollection);
    popularMovies = moviesCollection;
  } else if (type === "upcoming") {
    upcomingMovies = moviesCollection;
  } else if (type === "now_playing") {
    nowPlayingMovies = moviesCollection;
  }
};

export async function getMovieDetails(movieId) {
  let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

  let response = await fetch(url);
  let data = await response.json();

  let movieData = new Movie({
    id: data.id,
    title: data.title,
    releaseDate: data.release_date,
    rating: data.vote_average,
    posterPath: data.poster_path,
    description: data.overview,
    originalLanguage: data.original_language,
    genres: data.genres,
  });
  singleMovieData = movieData;
}
