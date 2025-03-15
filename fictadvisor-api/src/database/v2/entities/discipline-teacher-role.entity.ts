import { DbDisciplineType } from './discipline-type.entity';

export class DbDisciplineTeacherRole {
  disciplineTeacherId: string;
  disciplineTypeId: string;
  disciplineType: DbDisciplineType;
  createdAt: Date;
  updatedAt: Date;
}
