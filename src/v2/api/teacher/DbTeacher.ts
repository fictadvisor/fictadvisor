import { Discipline, DisciplineTeacherRole } from '@prisma/client';

export class DbTeacher {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  description?: string;
  avatar?: string;
  disciplineTeachers: {
    id: string,
    teacherId: string,
    disciplineId: string,
    discipline: Discipline,
    roles: DisciplineTeacherRole[];
  }[];
}
