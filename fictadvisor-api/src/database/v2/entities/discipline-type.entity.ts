import { DbDisciplineTeacherRole } from './discipline-teacher-role.entity';
import { DbDiscipline } from './discipline.entity';
import { DisciplineTypeEnum } from '@prisma/client/fictadvisor';
import { DbLesson } from './lesson.entity';
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

  @AutoMap(() => [DbLesson])
    lessons?: DbLesson[];

  createdAt: Date | null;
  updatedAt: Date | null;
}
