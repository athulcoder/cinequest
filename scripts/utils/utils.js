export function formatMovieRating(rate) {
  let formatedRate = Math.round(rate * 10) / 10;

  return formatedRate.toFixed(1);
}
