import { DbDisciplineTeacherRole } from './DbDisciplineTeacherRole';
import { DbDiscipline } from './DbDiscipline';
import { DbTeacher } from './DbTeacher';
import { DbQuestionAnswer } from './DbQuestionAnswer';
import { DbRemovedDisciplineTeacher } from './DbRemovedDisciplineTeacher';
import { AutoMap } from '@automapper/classes';

export class DbDisciplineTeacher {
  @AutoMap()
    id: string;

  @AutoMap(() => DbDiscipline)
    discipline?: DbDiscipline;

  @AutoMap()
    disciplineId: string;

  @AutoMap(() => DbTeacher)
    teacher?: DbTeacher;

  @AutoMap()
    teacherId: string;

  @AutoMap(() => [DbDisciplineTeacherRole])
    roles?: DbDisciplineTeacherRole[];

  @AutoMap(() => [DbQuestionAnswer])
    questionAnswers?: DbQuestionAnswer[];

  @AutoMap(() => [DbRemovedDisciplineTeacher])
    removedDisciplineTeachers?: DbRemovedDisciplineTeacher[];

  createdAt: Date | null;
  updatedAt: Date | null;
}
