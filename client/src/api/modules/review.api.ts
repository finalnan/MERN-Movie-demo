import privateClient from '../client/private.client';
import { AddReview } from './review';

const ReviewEndpoints = {
  list: 'reviews',
  add: 'reviews',
  remove: ({ reviewId }: { reviewId: string }) => `reviews/${reviewId}`,
};

const reviewApi = {
  add: async (addReview: AddReview) => {
    try {
      const response: any = await privateClient.post(
        ReviewEndpoints.add,
        addReview
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  remove: async ({ reviewId }: { reviewId: string }) => {
    try {
      const response = await privateClient.delete(
        ReviewEndpoints.remove({ reviewId })
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },
  getList: async () => {
    try {
      const response: any = await privateClient.get(ReviewEndpoints.list);
      console.log(response);
      return { response };
    } catch (error: any) {
      return { error };
    }
  },
};

export default reviewApi;
