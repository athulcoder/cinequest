export class Cast {
  id;
  name;
  order;
  profilePath;
  gender;
  castId;
  character;
  popularity;
  adult;

  constructor(castDetails) {
    this.id = castDetails.id;
    this.name = castDetails.name;
    this.order = castDetails.order;
    this.profilePath = castDetails.profilePath;
    this.gender = castDetails.gender;
    this.castId = castDetails.castId;
    this.popularity = castDetails.popularity;
    (this.character = castDetails.character), (this.adult = castDetails.adult);
  }

  getProfileUrl() {
    let profileUrl = `https://image.tmdb.org/t/p/w185${this.profilePath}`;
    return profileUrl;
  }
}
