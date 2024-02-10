import { Discipline, Cathedra, TeachersOnCathedras, DisciplineType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

export class DbTeacher {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  description?: string;
  avatar?: string;
  cathedras: (TeachersOnCathedras & {
    cathedra: Cathedra,
  })[];
  rating: Decimal;
  disciplineTeachers?: {
    id: string,
    teacherId: string,
    disciplineId: string,
    discipline: Discipline & { disciplineTypes: DisciplineType[] };
  }[];
}
