import { configureStore } from '@reduxjs/toolkit';

import ExampleReducer from '@/redux/reducers/example.reducer';

export const store = configureStore({
  reducer: {
    example: ExampleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
