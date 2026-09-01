import { DbDisciplineType } from './discipline-type.entity';
import { DbSubject } from './subject.entity';
import { DbBaseGroup, DbGroupWithSelectiveAmounts } from './group.entity';
import {
  DbDisciplineTeacherWithTeacher,
  DbDisciplineTeacherWithTeacherAndRoles,
} from './discipline-teacher.entity';
import { AutoMap } from '@automapper/classes';

export class DbBaseDiscipline {
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

  @AutoMap()
    subjectId: string;

  @AutoMap()
    groupId: string;

  createdAt: Date | null;
  updatedAt: Date | null;
}

/** QuestionAnswerRepository, PollService: `discipline: { subject: true }` */
export class DbDisciplineWithSubject extends DbBaseDiscipline {
  @AutoMap(() => DbSubject)
    subject: DbSubject;
}

/** DisciplineTeacherRepository: `discipline: { group: true, subject: true, disciplineTypes: true }` */
export class DbDisciplineWithGroupAndTypes extends DbDisciplineWithSubject {
  @AutoMap(() => DbBaseGroup)
    group: DbBaseGroup;

  @AutoMap(() => [DbDisciplineType])
    disciplineTypes: DbDisciplineType[];
}

/** DisciplineService.getAll: narrowed list include (`group: true`, no disciplineTypes) */
export class DbShortDiscipline extends DbDisciplineWithSubject {
  @AutoMap(() => DbBaseGroup)
    group: DbBaseGroup;

  @AutoMap(() => [DbDisciplineTeacherWithTeacher])
    disciplineTeachers: DbDisciplineTeacherWithTeacher[];
}

/** DisciplineRepository */
export class DbDiscipline extends DbDisciplineWithSubject {
  @AutoMap(() => DbGroupWithSelectiveAmounts)
    group: DbGroupWithSelectiveAmounts;

  @AutoMap(() => [DbDisciplineType])
    disciplineTypes: DbDisciplineType[];

  @AutoMap(() => [DbDisciplineTeacherWithTeacherAndRoles])
    disciplineTeachers: DbDisciplineTeacherWithTeacherAndRoles[];
}
