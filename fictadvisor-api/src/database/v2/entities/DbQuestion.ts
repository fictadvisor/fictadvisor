import { QuestionDisplay, QuestionType } from '@prisma/client/fictadvisor';
import { DbQuestionAnswer } from './DbQuestionAnswer';

export class DbQuestion {
  id: string;
  category: string;
  name: string;
  order: number;
  description: string | null;
  text: string;
  isRequired: boolean;
  criteria: string | null;
  type: QuestionType;
  display: QuestionDisplay;
  createdAt: Date | null;
  updatedAt: Date | null;
  questionAnswers?: DbQuestionAnswer[];
}
