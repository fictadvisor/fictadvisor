import {
  ScientificDegree,
  AcademicStatus,
  Position,
  Prisma,
} from '@prisma-client/fictadvisor';
import {
  DbDisciplineTeacherWithDisciplineAndRoles,
  DbDisciplineTeacherWithRoles,
  DbDisciplineTeacherWithRolesAndAnswers,
} from './discipline-teacher.entity';
import { DbTeachersOnCathedrasWithCathedra } from './teachers-on-cathedras.entity';
import { AutoMap } from '@automapper/classes';

export class DbBaseTeacher {
  @AutoMap()
    id: string;

  @AutoMap()
    firstName: string;

  @AutoMap(() => String)
    middleName: string | null;

  @AutoMap()
    lastName: string;

  @AutoMap(() => String)
    description: string | null;

  @AutoMap(() => String)
    avatar: string | null;

  @AutoMap(() => String)
    scientificDegree: ScientificDegree | null;

  @AutoMap(() => String)
    academicStatus: AcademicStatus | null;

  @AutoMap(() => String)
    position: Position | null;

  @AutoMap(() => Number)
    rating: Prisma.Decimal;

  createdAt: Date | null;
  updatedAt: Date | null;
}

/** DisciplineRepository, DisciplineTeacherRepository: `teacher: { cathedras: { cathedra: true } }` */
export class DbTeacherWithCathedras extends DbBaseTeacher {
  @AutoMap(() => [DbTeachersOnCathedrasWithCathedra])
    cathedras: DbTeachersOnCathedrasWithCathedra[];
}

/** Cathedras plus role-bearing discipline teachers — what TeacherWithRolesAndCathedrasResponse reads. */
export class DbTeacherWithRoles extends DbTeacherWithCathedras {
  @AutoMap(() => [DbDisciplineTeacherWithRoles])
    disciplineTeachers: DbDisciplineTeacherWithRoles[];
}

/** TeacherRepository */
export class DbTeacher extends DbTeacherWithRoles {
  @AutoMap(() => [DbDisciplineTeacherWithDisciplineAndRoles])
    disciplineTeachers: DbDisciplineTeacherWithDisciplineAndRoles[];
}

/** SubjectService.getTeachers: overrides `disciplineTeachers` with `roles` + `questionAnswers` */
export class DbTeacherWithAnswers extends DbTeacherWithRoles {
  @AutoMap(() => [DbDisciplineTeacherWithRolesAndAnswers])
    disciplineTeachers: DbDisciplineTeacherWithRolesAndAnswers[];
}
