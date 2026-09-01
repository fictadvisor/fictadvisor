import { DbQuestion } from './question.entity';
import {
  DbDisciplineTeacherWithDiscipline,
  DbDisciplineTeacherWithDisciplineAndTeacher,
} from './discipline-teacher.entity';
import { AutoMap } from '@automapper/classes';

export class DbBaseQuestionAnswer {
  @AutoMap()
    disciplineTeacherId: string;

  @AutoMap()
    questionId: string;

  @AutoMap()
    userId: string;

  @AutoMap()
    value: string;

  createdAt: Date | null;
  updatedAt: Date | null;
}

/** SubjectService.getTeachers: `questionAnswers: { question: true }` */
export class DbQuestionAnswerWithQuestion extends DbBaseQuestionAnswer {
  @AutoMap(() => DbQuestion)
    question: DbQuestion;
}

/** PollService.getQuestionWithText: `disciplineTeacher: { discipline: { subject } }` */
export class DbQuestionAnswerWithDiscipline extends DbQuestionAnswerWithQuestion {
  @AutoMap(() => DbDisciplineTeacherWithDiscipline)
    disciplineTeacher: DbDisciplineTeacherWithDiscipline;
}

/** QuestionAnswerRepository */
export class DbQuestionAnswer extends DbQuestionAnswerWithQuestion {
  @AutoMap(() => DbDisciplineTeacherWithDisciplineAndTeacher)
    disciplineTeacher: DbDisciplineTeacherWithDisciplineAndTeacher;
}
