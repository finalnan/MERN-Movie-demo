export interface Images {
  id: number;
  backdrops: Image[];
  logos: Image[];
  posters: Image[];
}

interface Image {
  aspect_ratio: number;
  file_path: string;
  height: number;
  vote_average: number;
  vote_count: number;
  width: number;
  ios_639_1: string | null;
}
