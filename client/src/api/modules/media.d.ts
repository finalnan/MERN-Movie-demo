export interface MediaList {
  mediaType: string;
  mediaCategory: string;
  page: number;
}

export interface SearchMedia {
  mediaType: string;
  query: string;
  page: number;
}
