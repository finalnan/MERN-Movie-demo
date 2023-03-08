import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const authModalSlice = createSlice({
  name: 'authModal',
  initialState: {
    authModalOpen: false,
  },
  reducers: {
    setAuthModalOpen: (state, action: PayloadAction<boolean>) => {
      state.authModalOpen = action.payload;
    },
  },
});

export const { setAuthModalOpen } = authModalSlice.actions;

export default authModalSlice.reducer;
