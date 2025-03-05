import { QuestionAnswer } from '@prisma/client/fictadvisor';
import { DbQuestion } from './DbQuestion';

export class DbQuestionWithAnswers extends DbQuestion {
  questionAnswers: QuestionAnswer[];
}
