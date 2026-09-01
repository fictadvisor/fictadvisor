import { DbDisciplineTeacherRole } from './discipline-teacher-role.entity';
import {
  DbBaseDiscipline,
  DbDisciplineWithGroupAndTypes,
  DbDisciplineWithSubject,
} from './discipline.entity';
import { DbBaseTeacher, DbTeacherWithCathedras } from './teacher.entity';
import { DbQuestionAnswerWithQuestion } from './question-answer.entity';
import { AutoMap } from '@automapper/classes';

export class DbBaseDisciplineTeacher {
  @AutoMap()
    id: string;

  @AutoMap()
    disciplineId: string;

  @AutoMap()
    teacherId: string;

  createdAt: Date | null;
  updatedAt: Date | null;
}

/** DisciplineService.getAll: `disciplineTeachers: { teacher: true }` */
export class DbDisciplineTeacherWithTeacher extends DbBaseDisciplineTeacher {
  @AutoMap(() => DbBaseTeacher)
    teacher: DbBaseTeacher;
}

/** Every include that loads roles does so as `roles: { disciplineType: true }`. */
export class DbDisciplineTeacherWithRoles extends DbBaseDisciplineTeacher {
  @AutoMap(() => [DbDisciplineTeacherRole])
    roles: DbDisciplineTeacherRole[];
}

/** DisciplineRepository: `disciplineTeachers: { teacher: { cathedras }, roles: { disciplineType } }` */
export class DbDisciplineTeacherWithTeacherAndRoles extends DbDisciplineTeacherWithRoles {
  @AutoMap(() => DbTeacherWithCathedras)
    teacher: DbTeacherWithCathedras;
}

/** TeacherRepository: `disciplineTeachers: { discipline: true, roles: { disciplineType } }` */
export class DbDisciplineTeacherWithDisciplineAndRoles extends DbDisciplineTeacherWithRoles {
  @AutoMap(() => DbBaseDiscipline)
    discipline: DbBaseDiscipline;
}

/** SubjectService.getTeachers: `disciplineTeachers: { roles, questionAnswers: { question } }` */
export class DbDisciplineTeacherWithRolesAndAnswers extends DbDisciplineTeacherWithRoles {
  @AutoMap(() => [DbQuestionAnswerWithQuestion])
    questionAnswers: DbQuestionAnswerWithQuestion[];
}

/** PollService.getQuestionWithText: `disciplineTeacher: { discipline: { subject } }` */
export class DbDisciplineTeacherWithDiscipline extends DbBaseDisciplineTeacher {
  @AutoMap(() => DbDisciplineWithSubject)
    discipline: DbDisciplineWithSubject;
}

/** QuestionAnswerRepository: `disciplineTeacher: { discipline: { subject }, teacher: true }` */
export class DbDisciplineTeacherWithDisciplineAndTeacher extends DbDisciplineTeacherWithDiscipline {
  @AutoMap(() => DbBaseTeacher)
    teacher: DbBaseTeacher;
}

/** DisciplineTeacherRepository */
export class DbDisciplineTeacher extends DbDisciplineTeacherWithRoles {
  @AutoMap(() => DbDisciplineWithGroupAndTypes)
    discipline: DbDisciplineWithGroupAndTypes;

  @AutoMap(() => DbTeacherWithCathedras)
    teacher: DbTeacherWithCathedras;
}
