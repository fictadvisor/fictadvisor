import { QuestionRole } from '@prisma/client/fictadvisor';
import { DbQuestion } from './question.entity';

export class DbQuestionWithRoles extends DbQuestion {
  questionRoles: QuestionRole[];
}
