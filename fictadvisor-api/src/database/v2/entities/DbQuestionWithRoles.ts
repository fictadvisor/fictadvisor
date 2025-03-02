import { QuestionRole } from '@prisma/client';
import { DbQuestion } from './DbQuestion';

export class DbQuestionWithRoles extends DbQuestion {
  questionRoles: QuestionRole[];
}