import { DbDisciplineTeacherRole } from './discipline-teacher-role.entity';
import { DbDiscipline } from './discipline.entity';
import { DbTeacher } from './teacher.entity';
import { DbQuestionAnswer } from './question-answer.entity';
import { DbRemovedDisciplineTeacher } from './removed-discipline-teacher.entity';
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
