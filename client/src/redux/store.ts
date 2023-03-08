import { configureStore } from '@reduxjs/toolkit';
import authModalReducer from './features/authModalSlice';
import themeModeReducer from './features/themeModeSlice';
import globalLoadingSlice from './features/globalLoadingSlice';
import appStateReducer from './features/appStateSlice';

import userReducer from './features/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    themeMode: themeModeReducer,
    authModal: authModalReducer,
    globalLoading: globalLoadingSlice,
    appState: appStateReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppdisPatch = typeof store.dispatch;
