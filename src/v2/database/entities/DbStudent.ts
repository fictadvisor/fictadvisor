import { Discipline, Group, Role, SelectiveDiscipline, State } from '@prisma/client';

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
  selectiveDisciplines?: (SelectiveDiscipline & {
    discipline: Discipline,
  })[];
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
