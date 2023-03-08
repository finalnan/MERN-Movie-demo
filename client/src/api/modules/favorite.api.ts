import { Favorite } from '../../types/favorite';
import privateClient from '../client/private.client';
import { AddFavorite } from './favorite';

const favoriteEndpoints = {
  list: 'user/favorites',
  add: 'user/favorites',
  remove: ({ favoriteId }: { favoriteId: string }) =>
    `user/favorites/${favoriteId}`,
};

const favoriteApi = {
  getList: async () => {
    try {
      const response: any = await privateClient.get(favoriteEndpoints.list);

      return { response };
    } catch (error: any) {
      return { error };
    }
  },
  add: async (addFavorite: AddFavorite) => {
    try {
      const response: Favorite = await privateClient.post(
        favoriteEndpoints.add,
        addFavorite
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  remove: async ({ favoriteId }: { favoriteId: string }) => {
    try {
      const response = await privateClient.delete(
        favoriteEndpoints.remove({ favoriteId })
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },
};

export default favoriteApi;
