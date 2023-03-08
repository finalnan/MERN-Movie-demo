import { GenreResponse } from '../../types/genre';
import publicClient from '../client/public.client';

const genreEndpoints = {
  list: ({ mediaType }: { mediaType: string }) => `${mediaType}/genres`,
};

const genreApi = {
  getList: async ({ mediaType }: { mediaType: string }) => {
    try {
      const response: GenreResponse = await publicClient.get(
        genreEndpoints.list({ mediaType })
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },
};

export default genreApi;
