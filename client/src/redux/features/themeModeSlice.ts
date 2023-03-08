import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const themeModeSlice = createSlice({
  name: 'themeMode',
  initialState: {
    themeMode: 'dark',
  },
  reducers: {
    setThemeMode: (state, action: PayloadAction<string>) => {
      state.themeMode = action.payload;
    },
  },
});

export const { setThemeMode } = themeModeSlice.actions;

export default themeModeSlice.reducer;
