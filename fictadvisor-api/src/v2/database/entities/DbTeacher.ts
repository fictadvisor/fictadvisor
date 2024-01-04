import { Discipline, DisciplineTeacherRole, TeachersOnCathedras } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

export class DbTeacher {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  description?: string;
  avatar?: string;
  cathedras: TeachersOnCathedras[];
  rating: Decimal;
  disciplineTeachers: {
    id: string,
    teacherId: string,
    disciplineId: string,
    discipline: Discipline,
    roles: DisciplineTeacherRole[];
  }[];
}
