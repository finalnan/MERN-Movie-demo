import { Favorite } from '../types/favorite';

const favoriteUtils = {
  check: ({
    listFavorites,
    mediaId,
  }: {
    listFavorites: Favorite[];
    mediaId: string;
  }) =>
    listFavorites &&
    listFavorites.find(
      (favorite) => favorite.mediaId.toString() === mediaId.toString()
    ) !== undefined,
};

export default favoriteUtils;
