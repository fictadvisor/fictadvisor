import { Discipline, DisciplineTeacherRole, TeachersOnCathedras } from '@prisma/client';

export class DbTeacher {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  description?: string;
  avatar?: string;
  cathedras: TeachersOnCathedras[];
  disciplineTeachers: {
    id: string,
    teacherId: string,
    disciplineId: string,
    discipline: Discipline,
    roles: DisciplineTeacherRole[];
  }[];
}
