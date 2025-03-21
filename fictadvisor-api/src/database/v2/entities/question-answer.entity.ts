import { DbQuestion } from './question.entity';
import { DbDisciplineTeacher } from './discipline-teacher.entity';
import { DbUser } from './user.entity';

export class DbQuestionAnswer {
  disciplineTeacherId: string;
  questionId: string;
  question?: DbQuestion;
  userId: string;
  user?: DbUser;
  value: string;
  disciplineTeacher?: DbDisciplineTeacher;
  createdAt: Date | null;
  updatedAt: Date | null;
}
