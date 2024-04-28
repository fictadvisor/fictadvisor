import { RoleName, State } from '@fictadvisor/utils/enums';

export interface UserGroup {
  id: string;
  code: string;
  role?: RoleName;
  state: State;
}

export interface User {
  id: string;
  username: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  telegramId?: number;
  group?: UserGroup;
  avatar: string;
}

export interface UserRemainingSelective {
  disciplineId: string;
  subjectName: string;
}

export interface SimplifiedUser {
  id: string;
  email: string;
  username: string;
  telegramId?: number;
  avatar?: string;
  state: State;
}
