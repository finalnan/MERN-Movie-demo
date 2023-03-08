export interface AddFavorite {
  mediaId: number;
  mediaType: string;
  mediaTitle: string;
  mediaPoster?: string | null;
  mediaRate: number;
}
