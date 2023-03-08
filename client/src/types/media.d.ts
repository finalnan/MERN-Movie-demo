import type { Cast } from './cast';
import type { Crew } from './crew';
import type { Genre } from './genre';
import { Images } from './images';
import { Review } from './review';
import type { Video } from './video';

export interface MediaResponse {
  page: number;
  results: Movie[] & TV[];
  total_pages: number;
  total_results: number;
}

export interface Media {
  backdrop_path: string;
  first_air_date: string;
  created_by: [
    {
      credit_id: string;
      gender: number;
      id: number;
      name: string;
      profile_path: string;
    }
  ];
  credits: {
    cast: Cast[];
  };
  title?: string;
  name?: string;
  genres: Genre[];
  id: number;
  isFavorite: boolean;
  overview: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  poster_path?: string;
  videos: {
    id: number;
    results: Video[];
  };
  images: Images;
  recommend: Movie[] | TV[];
  reviews: Review[];
  mediaType: string;
}

export interface Movie extends Media {
  title: string;
  genre_ids: number[];
  release_date: string;
}

export interface TV extends Media {
  name: string;
  poster_path: string;
  first_air_date: string;
}

export interface Person {
  birthday?: string;
  known_for_department: string;
  deathday?: string;
  id: number;
  name: string;
  also_known_as: string[];
  gender: number;
  biography: string;
  popularity: number;
  profile_path: string;
}

export interface PersonMedias {
  cast: Cast[];
  crew: Crew[];
  id: number;
}
