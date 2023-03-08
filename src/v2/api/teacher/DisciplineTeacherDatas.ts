import { TeacherRole } from '@prisma/client';

export class DisciplineTeacherWithRoles {
  roles: {
    role: TeacherRole,
  }[];
}

export class DisciplineTeacherWithRolesAndTeacher {
  id: string;
  roles: {
    role: TeacherRole,
  }[];
  teacher: {
    id: string,
    firstName: string,
    middleName: string,
    lastName: string,
    avatar: string,
  };
}