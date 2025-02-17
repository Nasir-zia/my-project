import { configureStore } from '@reduxjs/toolkit';
import gitUserSlice from './features/gituserslice';

export const store = configureStore({
  reducer: {
    app: gitUserSlice,
  },
});
