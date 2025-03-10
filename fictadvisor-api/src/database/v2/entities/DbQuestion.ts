import { QuestionDisplay, QuestionType } from '@prisma/client/fictadvisor';
import { DbQuestionRole } from './DbQuestionRole';
import { DbQuestionAnswer } from './DbQuestionAnswer';

export class DbQuestion {
  id: string;
  category: string;
  name: string;
  order: number;
  description?: string;
  text: string;
  isRequired: boolean;
  criteria?: string;
  type: QuestionType;
  display: QuestionDisplay;
  createdAt: Date | null
  updatedAt: Date | null;
  questionRoles?: DbQuestionRole[];
  questionAnswers?: DbQuestionAnswer[];
}
