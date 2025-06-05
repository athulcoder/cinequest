import iso6391 from "https://esm.sh/iso-639-1";
import { Cast } from "./cast.js";

class Movie {
  // core
  id;
  title;
  imdbId;
  originalTitle;
  tagline;
  duration;
  budget;
  status;
  revenue;
  adult;
  description;
  originalLanguage;

  // Dates
  releaseDate;
  releaseDates;

  // Images
  posterPath;
  backdropPath;
  images;

  // Genres and keywords
  genres;
  keywords;

  // Videos
  video; // boolean
  videos;

  // spokenLangauges
  spokenLanguages;

  // production info
  productionCompanies;
  productionCountries;

  // Cast and crew
  importantCasts;

  // Ratings

  rating;
  voteCount;
  popularity;

  // Collections
  belongsToCollection;

  // Reviews
  reviews;

  // Similar and Recommendations

  similarMovies;
  recommendations;

  // Convenience Flags
  hasTrailers;
  hasReviews;
  hasSimilar;

  constructor(movieDetails) {
    this.id = movieDetails.id;
    this.title = movieDetails.title;
    this.originalTitle = movieDetails.original_title;
    this.description = movieDetails.overview;
    this.tagline = movieDetails.tagline;
    this.status = movieDetails.status;
    this.originalLanguage = movieDetails.original_language;
    this.duration = movieDetails.runtime;
    this.budget = movieDetails.budget;
    this.revenue = movieDetails.revenue;
    this.homepage = movieDetails.homepage;
    this.imdbId = movieDetails.imdb_id;
    this.releaseDate = movieDetails.release_date;
    this.backdropPath = movieDetails.backdrop_path;
    this.posterPath = movieDetails.poster_path;
    this.genres = movieDetails.genres;
    this.spokenLanguages = movieDetails.spoken_languages;
    this.productionCompanies = movieDetails.production_companies;
    this.productionCountries = movieDetails.production_countries;
    this.rating = movieDetails.vote_average;
    this.voteCount = movieDetails.vote_count;
    this.popularity = movieDetails.popularity;
    this.adult = movieDetails.adult;
    this.video = movieDetails.video;
    this.belongsToCollection = movieDetails.belongs_to_collection;
  }

  getPosterUrl() {
    const posterBaseUrl = "https://image.tmdb.org/t/p/w500/";
    const posterUrl = `${posterBaseUrl}${this.posterPath}`;
    console.log(posterUrl);
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

  // get Credits

  async getImportantCast() {
    let url = `https://api.themoviedb.org/3/movie/${this.id}/credits?api_key=${apiKey}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    let members = data.cast.filter((member) => member.order < 5);
    let importantCasts = members.map((cast) => {
      return new Cast({
        id: cast.id,
        name: cast.name,
        order: cast.order,
        profilePath: cast.profile_path,
        gender: cast.gender,
        castId: cast.cast_id,
        character: cast.character,
        popularity: cast.popularity,
        adult: cast.adult,
      });
    });
    return importantCasts;
  }
}

const apiKey = "6611e0fcfa7c8d1e9db14266919ca167";

export let searchedMovies;
export let singleMovieData;
// Global Arrays of movies
let popularMovies = [];
let nowPlayingMovies = [];
let upcomingMovies = [];
let topRatedMovies = [];

// Function to fetch movies data from server
export let getMovies = async (type) => {
  const url = `https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}`;

  let response = await fetch(url);

  let data = await response.json();

  let moviesCollection = data.results.map((movieDetails) => {
    return new Movie({
      id: movieDetails.id,
      title: movieDetails.title,
      original_title: movieDetails.original_title,
      overview: movieDetails.overview,
      tagline: movieDetails.tagline,
      status: movieDetails.status,
      original_language: movieDetails.original_language,
      runtime: movieDetails.runtime,
      budget: movieDetails.budget,
      revenue: movieDetails.revenue,
      homepage: movieDetails.homepage,
      imdb_id: movieDetails.imdb_id,
      release_date: movieDetails.release_date,
      backdrop_path: movieDetails.backdrop_path,
      poster_path: movieDetails.poster_path,
      genres: movieDetails.genres,
      spoken_languages: movieDetails.spoken_languages,
      production_companies: movieDetails.production_companies,
      production_countries: movieDetails.production_countries,
      vote_average: movieDetails.vote_average,
      vote_count: movieDetails.vote_count,
      popularity: movieDetails.popularity,
      adult: movieDetails.adult,
      video: movieDetails.video,
      belongs_to_collection: movieDetails.belongs_to_collection,
    });
  });

  if (type === "popular") {
    popularMovies = moviesCollection;
  } else if (type === "top_rated") {
    topRatedMovies = moviesCollection;
  } else if (type === "upcoming") {
    upcomingMovies = moviesCollection;
  } else if (type === "now_playing") {
    nowPlayingMovies = moviesCollection;
  }
};

export async function getMovieDetails(movieId) {
  let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

  let response = await fetch(url);
  let movieDetails = await response.json();

  let movieData = new Movie({
    id: movieDetails.id,
    title: movieDetails.title,
    original_title: movieDetails.original_title,
    overview: movieDetails.overview,
    tagline: movieDetails.tagline,
    status: movieDetails.status,
    original_language: movieDetails.original_language,
    runtime: movieDetails.runtime,
    budget: movieDetails.budget,
    revenue: movieDetails.revenue,
    homepage: movieDetails.homepage,
    imdb_id: movieDetails.imdb_id,
    release_date: movieDetails.release_date,
    backdrop_path: movieDetails.backdrop_path,
    poster_path: movieDetails.poster_path,
    genres: movieDetails.genres,
    spoken_languages: movieDetails.spoken_languages,
    production_companies: movieDetails.production_companies,
    production_countries: movieDetails.production_countries,
    vote_average: movieDetails.vote_average,
    vote_count: movieDetails.vote_count,
    popularity: movieDetails.popularity,
    adult: movieDetails.adult,
    video: movieDetails.video,
    belongs_to_collection: movieDetails.belongs_to_collection,
  });
  singleMovieData = movieData;
}

export async function getMoviesBySearch(query) {
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

  let response = await fetch(url);

  let data = await response.json();

  let moviesCollection = data.results.map((movieDetails) => {
    return new Movie({
      id: movieDetails.id,
      title: movieDetails.title,
      original_title: movieDetails.original_title,
      overview: movieDetails.overview,
      tagline: movieDetails.tagline,
      status: movieDetails.status,
      original_language: movieDetails.original_language,
      runtime: movieDetails.runtime,
      budget: movieDetails.budget,
      revenue: movieDetails.revenue,
      homepage: movieDetails.homepage,
      imdb_id: movieDetails.imdb_id,
      release_date: movieDetails.release_date,
      backdrop_path: movieDetails.backdrop_path,
      poster_path: movieDetails.poster_path,
      genres: movieDetails.genres,
      spoken_languages: movieDetails.spoken_languages,
      production_companies: movieDetails.production_companies,
      production_countries: movieDetails.production_countries,
      vote_average: movieDetails.vote_average,
      vote_count: movieDetails.vote_count,
      popularity: movieDetails.popularity,
      adult: movieDetails.adult,
      video: movieDetails.video,
      belongs_to_collection: movieDetails.belongs_to_collection,
    });
  });

  searchedMovies = moviesCollection;
}

export { popularMovies, nowPlayingMovies, upcomingMovies, topRatedMovies };
