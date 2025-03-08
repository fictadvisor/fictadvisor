import { DbDisciplineType } from './discipline-type.entity';
import { DbSubject } from './subject.entity';
import { DbGroup } from './group.entity';
import { DbSelectiveDiscipline } from './selective-discipline.entity';
import { DbDisciplineTeacher } from './discipline-teacher.entity';
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
