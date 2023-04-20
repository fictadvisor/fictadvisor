import { DisciplineTeacher } from '@prisma/client';

export class DbTeacher {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  description?: string;
  avatar?: string;
  disciplineTeachers: DisciplineTeacher[];
}
