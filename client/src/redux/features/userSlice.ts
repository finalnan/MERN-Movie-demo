import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { User } from '../models/user';
import { Favorite } from '../../types/favorite';

interface UserState {
  user: User | null;
  listFavorites: Favorite[] | [];
}

const initialState: UserState = {
  user: null,
  listFavorites: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      if (action.payload === null) {
        localStorage.removeItem('token');
      } else {
        if (action.payload.token)
          localStorage.setItem('token', action.payload.token);
      }

      state.user = action.payload;
    },

    setListFavorites: (state, action) => {
      state.listFavorites = action.payload;
    },

    removeFavorite: (state, action: PayloadAction<{ mediaId: string }>) => {
      const { mediaId } = action.payload;
      state.listFavorites = [...state.listFavorites].filter(
        (favorite) => favorite.mediaId.toString() !== mediaId.toString()
      );
    },

    addFavorite: (state, action: PayloadAction<Favorite>) => {
      state.listFavorites = [action.payload, ...state.listFavorites];
    },
  },
});

export const { setUser, setListFavorites, addFavorite, removeFavorite } =
  userSlice.actions;

export default userSlice.reducer;
