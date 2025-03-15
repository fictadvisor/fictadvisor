import { DbDisciplineTeacherRole } from './DbDisciplineTeacherRole';
import { DbDiscipline } from './DbDiscipline';
import { DisciplineTypeEnum } from '@prisma/client/fictadvisor';
import { AutoMap } from '@automapper/classes';

export class DbDisciplineType {
  @AutoMap()
    id: string;

  @AutoMap(() => DbDiscipline)
    discipline?: DbDiscipline;

  @AutoMap()
    disciplineId: string;

  @AutoMap(() => String)
    name: DisciplineTypeEnum;

  @AutoMap(() => [DbDisciplineTeacherRole])
    disciplineTeacherRoles?: DbDisciplineTeacherRole[];

  createdAt: Date | null;
  updatedAt: Date | null;
}
