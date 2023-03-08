import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const globalLoadingSlice = createSlice({
  name: 'authModal',
  initialState: {
    globalLoading: false,
  },
  reducers: {
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.globalLoading = action.payload;
    },
  },
});

export const { setGlobalLoading } = globalLoadingSlice.actions;

export default globalLoadingSlice.reducer;
