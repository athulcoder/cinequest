class Movie {
  id;
  title;
  releaseDate;
  rating;
  posterPath;
  originalLanguage;
  description;
  genreIds;

  constructor(movieDetails) {
    this.id = movieDetails.id;
    this.title = movieDetails.title;
    this.releaseDate = movieDetails.releaseDate;
    this.rating = movieDetails.rating;
    this.posterPath = movieDetails.posterPath;
    this.description = movieDetails.description;
    this.originalLanguage = movieDetails.originalLanguage;
    this.genreIds = movieDetails.genreIds;
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
}

const apiKey = "6611e0fcfa7c8d1e9db14266919ca167";

let data;
// Global Arrays of movies
export let popularMovies = [];
export let nowPlayingMovies = [];
export let upcomingMovies = [];

// Function to fetch movies data from server
export let getMovies = async (type) => {
  const url = `https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}`;

  console.log(url);
  let response = await fetch(url);

  data = await response.json();

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
