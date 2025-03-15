import { QuestionAnswer } from '@prisma/client/fictadvisor';
import { DbQuestion } from './question.entity';

export class DbQuestionWithAnswers extends DbQuestion {
  questionAnswers: QuestionAnswer[];
}
