import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SetStudentsAction } from '@/redux/reducers/account-reducer/account.types';
import { SetRequestsAction } from '@/redux/reducers/account-reducer/account.types';
import { AccountStore } from '@/redux/reducers/account-reducer/account.types';

const initialState: AccountStore = {
  students: [],
  requests: [],
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setStudents: (state, { payload }: PayloadAction<SetStudentsAction>) => {
      state.students = payload.students;
    },
    setRequests: (state, { payload }: PayloadAction<SetRequestsAction>) => {
      state.requests = payload.requests;
    },
  },
});

export const { setStudents, setRequests } = accountSlice.actions;
export default accountSlice.reducer;
