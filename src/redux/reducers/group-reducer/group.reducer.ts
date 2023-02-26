import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  GroupsStore,
  SetGroupsAction,
} from '@/redux/reducers/group-reducer/group.types';

const initialState: GroupsStore = {
  groups: [],
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroups: (state, { payload }: PayloadAction<SetGroupsAction>) => {
      state.groups = payload.groups;
    },
  },
});

export const { setGroups } = groupsSlice.actions;
export default groupsSlice.reducer;
