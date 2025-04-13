import { configureStore } from '@reduxjs/toolkit';
import screenshotReducer from './screenshotSlice';

export const store = configureStore({
  reducer: {
    screenshot: screenshotReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
