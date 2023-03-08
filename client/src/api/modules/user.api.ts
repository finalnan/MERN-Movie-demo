import privateClient from '../client/private.client';
import publicClient from '../client/public.client';
import type { UserSignin, UserSignup, UserPasswordUpdate } from './user';
import type { User } from '../../redux/models/user';

enum UserEndpoints {
  SIGN_IN = 'user/signin',
  SIGN_UP = 'user/signup',
  GET_INFO = 'user/info',
  PASSWORD_UPATE = 'user/update-password',
  GET_FAVORITES = 'user/favorites',
  ADD_FAVORITE = 'user/favorites',
}

const userApi = {
  signin: async (user: UserSignin) => {
    try {
      const response: User = await publicClient.post(
        UserEndpoints.SIGN_IN,
        user
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  signup: async (user: UserSignup) => {
    try {
      const response: User = await publicClient.post(
        UserEndpoints.SIGN_UP,
        user
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  getInfo: async () => {
    try {
      const response: User = await privateClient.get(UserEndpoints.GET_INFO);

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  passwordUpdate: async (userPasswordUpdate: UserPasswordUpdate) => {
    try {
      const response = await privateClient.put(
        UserEndpoints.PASSWORD_UPATE,
        userPasswordUpdate
      );
      console.log(response);

      return { response };
    } catch (error: any) {
      return { error };
    }
  },
};

export default userApi;
