import { Discipline, Group, Role, SelectiveDiscipline, State, User } from '@prisma/client';

export class DbStudent {
  userId?: string;
  firstName: string;
  middleName: string;
  lastName: string;
  state: State;
  groupId?: string;
  group?: Group;
  roles?: {
    studentId: string,
    roleId: string,
    role: Role
  }[];
  selectiveDisciplines?: (SelectiveDiscipline & {
    discipline: Discipline,
  })[];
  user?: User;
}
