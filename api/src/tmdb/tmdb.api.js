import axiosClient from '../axios/axios.client.js';
import tmdbEndpoints from './tmdb.endpoints.js';

const tmdbApi = {
  mediaList: async ({ mediaType, mediaCategory, page }) =>
    await axiosClient.getRequest(
      tmdbEndpoints.mediaList({ mediaType, mediaCategory, page })
    ),

  mediaDetail: async ({ mediaType, mediaId }) =>
    await axiosClient.getRequest(
      tmdbEndpoints.mediaDetail({ mediaType, mediaId })
    ),

  mediaGenres: async ({ mediaType }) =>
    await axiosClient.getRequest(tmdbEndpoints.mediaGenres({ mediaType })),

  mediaCredits: async ({ mediaType, mediaId }) =>
    await axiosClient.getRequest(
      tmdbEndpoints.mediaCredits({ mediaType, mediaId })
    ),

  mediaVideos: async ({ mediaType, mediaId }) =>
    await axiosClient.getRequest(
      tmdbEndpoints.mediaVideos({ mediaType, mediaId })
    ),

  mediaImages: async ({ mediaType, mediaId }) =>
    await axiosClient.getRequest(
      tmdbEndpoints.mediaImages({ mediaType, mediaId })
    ),

  mediaRecommend: async ({ mediaType, mediaId }) =>
    await axiosClient.getRequest(
      tmdbEndpoints.mediaRecommend({ mediaType, mediaId })
    ),

  mediaSearch: async ({ mediaType, query, page }) =>
    await axiosClient.getRequest(
      tmdbEndpoints.mediaSearch({ mediaType, query, page })
    ),

  personDetail: async ({ personId }) =>
    await axiosClient.getRequest(tmdbEndpoints.personDetail({ personId })),

  personMedias: async ({ personId }) =>
    await axiosClient.getRequest(tmdbEndpoints.personMedias({ personId })),
};

export default tmdbApi;
