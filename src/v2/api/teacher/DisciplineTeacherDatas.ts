import { DisciplineTeacher, DisciplineTeacherRole, TeacherRole } from "@prisma/client";

export class DisciplineTeacherWithRoles implements DisciplineTeacher {
  disciplineId: string;
  id: string;
  teacherId: string;
  roles: DisciplineTeacherRole[];
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