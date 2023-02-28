import { configureStore } from '@reduxjs/toolkit';

import AccountReducer from '@/redux/reducers/account-reducer';
import GroupReducer from '@/redux/reducers/group-reducer/group.reducer';

export const store = configureStore({
  reducer: {
    groups: GroupReducer,
    account: AccountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
