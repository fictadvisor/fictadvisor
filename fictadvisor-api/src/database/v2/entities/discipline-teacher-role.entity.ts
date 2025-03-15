import { DbDisciplineType } from './discipline-type.entity';
import { DbDisciplineTeacher } from './discipline-teacher.entity';

export class DbDisciplineTeacherRole {
  disciplineTeacherId: string;
  disciplineTeacher?: DbDisciplineTeacher;
  disciplineTypeId: string;
  disciplineType?: DbDisciplineType;
  createdAt: Date | null;
  updatedAt: Date | null;
}
