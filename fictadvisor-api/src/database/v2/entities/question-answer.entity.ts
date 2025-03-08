import { DbQuestion } from './question.entity';
import { DbDisciplineTeacher } from './discipline-teacher.entity';
import { DbUser } from './user.entity';
import { AutoMap } from '@automapper/classes';

export class DbQuestionAnswer {
  @AutoMap()
    disciplineTeacherId: string;

  @AutoMap()
    questionId: string;

  @AutoMap(() => DbQuestion)
    question?: DbQuestion;

  @AutoMap()
    userId: string;

  @AutoMap(() => DbUser)
    user?: DbUser;

  @AutoMap()
    value: string;

  @AutoMap(() => DbDisciplineTeacher)
    disciplineTeacher?: DbDisciplineTeacher;

  createdAt: Date | null;
  updatedAt: Date | null;
}
