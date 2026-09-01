import { DbDisciplineType } from './discipline-type.entity';
import { AutoMap } from '@automapper/classes';

/** Every repository that loads roles does so as `roles: { disciplineType: true }`. */
export class DbDisciplineTeacherRole {
  @AutoMap()
    disciplineTeacherId: string;

  @AutoMap(() => String)
    disciplineTypeId: string | null;

  @AutoMap(() => DbDisciplineType)
    disciplineType: DbDisciplineType | null;

  createdAt: Date | null;
  updatedAt: Date | null;
}
