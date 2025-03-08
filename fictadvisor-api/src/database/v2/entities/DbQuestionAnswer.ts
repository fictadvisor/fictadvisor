import { DbQuestion } from './DbQuestion';
import { DbDisciplineTeacher } from './DbDisciplineTeacher';
import { DbUser } from './DbUser';

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
