import { DbDisciplineType } from './DbDisciplineType';
import { DbSubject } from './DbSubject';
import { DbGroup } from './DbGroup';
import { DbSelectiveDiscipline } from './DbSelectiveDiscipline';
import { DbDisciplineTeacher } from './DbDisciplineTeacher';
import { AutoMap } from '@automapper/classes';

export class DbDiscipline {
  @AutoMap()
    id: string;

  @AutoMap()
    year: number;

  @AutoMap()
    semester: number;

  @AutoMap()
    isSelective: boolean;

  @AutoMap()
    description: string;

  @AutoMap(() => DbSubject)
    subject?: DbSubject;

  @AutoMap()
    subjectId: string;

  @AutoMap(() => DbGroup)
    group?: DbGroup;

  @AutoMap()
    groupId: string;

  @AutoMap(() => [DbDisciplineType])
    disciplineTypes?: DbDisciplineType[];

  @AutoMap(() => [DbSelectiveDiscipline])
    selectiveDisciplines?: DbSelectiveDiscipline[];

  @AutoMap(() => [DbDisciplineTeacher])
    disciplineTeachers?: DbDisciplineTeacher[];

  createdAt: Date | null;
  updatedAt: Date | null;
}
