import { Media, Movie } from '../types/media';

export function isMovie(media: Media): media is Movie {
  return (media as Movie).title !== undefined;
}
