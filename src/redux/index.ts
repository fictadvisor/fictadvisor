import { configureStore } from '@reduxjs/toolkit';

import AlertReducer from '@/redux/reducers/alert.reducer';

export const store = configureStore({
  reducer: {
    alert: AlertReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
