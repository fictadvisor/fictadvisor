export interface Group {
  id: string;
  code: string;
}

export interface GroupsStore {
  groups: Group[];
}

export interface SetGroupsAction {
  groups: Group[];
}
