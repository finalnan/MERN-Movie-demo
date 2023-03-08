import { MediaResponse, Person, PersonMedias } from '../../types/media';
import publicClient from '../client/public.client';

const personEndpoints = {
  detail: ({ personId }: { personId: string }) => `person/${personId}`,
  medias: ({ personId }: { personId: string }) => `person/${personId}/medias`,
};

const personApi = {
  detail: async ({ personId }: { personId: string }) => {
    try {
      const response: Person = await publicClient.get(
        personEndpoints.detail({ personId })
      );
      console.log(response);
      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  medias: async ({ personId }: { personId: string }) => {
    try {
      const response: PersonMedias = await publicClient.get(
        personEndpoints.medias({ personId })
      );
      return { response };
    } catch (error: any) {
      return { error };
    }
  },
};

export default personApi;
