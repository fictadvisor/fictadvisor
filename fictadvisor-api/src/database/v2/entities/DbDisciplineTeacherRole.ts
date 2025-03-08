import { DbDisciplineType } from './DbDisciplineType';
import { DbDisciplineTeacher } from './DbDisciplineTeacher';

export class DbDisciplineTeacherRole {
  disciplineTeacherId: string;
  disciplineTeacher?: DbDisciplineTeacher;
  disciplineTypeId: string;
  disciplineType?: DbDisciplineType;
  createdAt: Date | null;
  updatedAt: Date | null;
}
