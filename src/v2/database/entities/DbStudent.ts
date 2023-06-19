import { Discipline, Group, Role, State } from '@prisma/client';

export class DbStudent {
  userId?: string;
  firstName: string;
  middleName: string;
  lastName: string;
  state: State;
  groupId?: string;
  group?: Group;
  roles?: {
    role: Role
  }[];
  selectiveDisciplines?: {
    discipline: Discipline,
  }[];
  user?: {
    id: string,
    email: string,
    username: string,
    avatar: string,
    telegramId: number,
    password?: string,
    lastPasswordChanged?: Date,
    state: State,
  };
};
