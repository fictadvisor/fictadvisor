import { DbDisciplineType } from './discipline-type.entity';
import { DbDisciplineTeacher } from './discipline-teacher.entity';
import { AutoMap } from '@automapper/classes';

export class DbDisciplineTeacherRole {
  @AutoMap()
    disciplineTeacherId: string;

  @AutoMap(() => DbDisciplineTeacher)
    disciplineTeacher?: DbDisciplineTeacher;

  @AutoMap()
    disciplineTypeId: string;

  @AutoMap(() => DbDisciplineType)
    disciplineType?: DbDisciplineType;

  createdAt: Date | null;
  updatedAt: Date | null;
}
