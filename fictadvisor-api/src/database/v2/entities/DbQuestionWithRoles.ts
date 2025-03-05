import { QuestionRole } from '@prisma/client/fictadvisor';
import { DbQuestion } from './DbQuestion';

export class DbQuestionWithRoles extends DbQuestion {
  questionRoles: QuestionRole[];
}
