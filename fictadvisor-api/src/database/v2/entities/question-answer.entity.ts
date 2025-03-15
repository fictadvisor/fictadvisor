import { DisciplineTeacher, Discipline, Subject, Teacher } from '@prisma/client/fictadvisor';
import { DbQuestion } from './question.entity';

export class DbQuestionAnswer {
  disciplineTeacherId: string;
  questionId: string;
  userId: string;
  value: string;
  question?: DbQuestion;
  disciplineTeacher?: DisciplineTeacher & {
    discipline?: Discipline & {
      subject: Subject,
    },
    teacher?: Teacher,
  };
}
