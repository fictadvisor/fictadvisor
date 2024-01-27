import { Cathedra, Discipline, EducationalPrograms, Group, Role, SelectiveDiscipline, Speciality, State, User } from '@prisma/client';

export class DbStudent {
  userId?: string;
  firstName: string;
  middleName: string;
  lastName: string;
  state: State;
  groupId?: string;
  group?: Group & {
    cathedra?: Cathedra;
    educationalProgram?: {
      speciality: Speciality,
    } & EducationalPrograms
  };
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
