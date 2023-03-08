import { Media, MediaResponse } from '../../types/media';
import privateClient from '../client/private.client';
import publicClient from '../client/public.client';
import { MediaList, SearchMedia } from './media';

const mediaEndpoints = {
  list: ({ mediaType, mediaCategory, page }: MediaList) =>
    `${mediaType}/${mediaCategory}?page=${page}`,

  detail: ({ mediaType, mediaId }: { mediaType: string; mediaId: string }) =>
    `${mediaType}/detail/${mediaId}`,

  search: ({ mediaType, query, page }: SearchMedia) =>
    `${mediaType}/search?query=${query}&page=${page}`,
};

const mediaApi = {
  getList: async ({ mediaType, mediaCategory, page }: MediaList) => {
    try {
      const response: MediaResponse = await publicClient.get(
        mediaEndpoints.list({ mediaType, mediaCategory, page })
      );
      return { response };
    } catch (error: any) {
      return { error };
    }
  },
  getDetail: async ({
    mediaType,
    mediaId,
  }: {
    mediaType: string;
    mediaId: string;
  }) => {
    try {
      const response: Media = await privateClient.get(
        mediaEndpoints.detail({ mediaType, mediaId })
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },
  search: async (searchMedia: SearchMedia) => {
    try {
      const response: MediaResponse = await publicClient.get(
        mediaEndpoints.search(searchMedia)
      );
      return { response };
    } catch (error: any) {
      return { error };
    }
  },
};

export default mediaApi;
