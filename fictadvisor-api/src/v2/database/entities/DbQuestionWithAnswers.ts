import { QuestionAnswer } from '@prisma/client';
import { DbQuestion } from './DbQuestion';

export class DbQuestionWithAnswers extends DbQuestion {
  questionAnswers: QuestionAnswer[];
}