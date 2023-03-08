export enum MediaType {
  MOVIE = 'movie',
  TV = 'tv',
  People = 'people',
}

export enum MediaCategory {
  POPULAR = 'popular',
  TOPRATED = 'top_rated',
}

const backdropPath = (imgEndpoint: string) =>
  `http://image.tmdb.org/t/p/original/${imgEndpoint}`;

const posterPath = (imgEndpoint: string) =>
  `https://image.tmdb.org/t/p/w500/${imgEndpoint}`;

const youtubePath = (videoId: string) =>
  `https://www.youtube.com/embed/${videoId}?controls=0`;

const tmdbConfigs = {
  MediaType,
  MediaCategory,
  backdropPath,
  posterPath,
  youtubePath,
};

export default tmdbConfigs;
