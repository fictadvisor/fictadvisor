import { DbDisciplineType } from './DbDisciplineType';

export class DbDisciplineTeacherRole {
  disciplineTeacherId: string;
  disciplineTypeId: string;
  disciplineType: DbDisciplineType;
  createdAt: Date;
  updatedAt: Date;
}
