import { configureStore } from '@reduxjs/toolkit';

import GroupReducer from '@/redux/reducers/group-reducer/group.reducer';

export const store = configureStore({
  reducer: {
    groups: GroupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
