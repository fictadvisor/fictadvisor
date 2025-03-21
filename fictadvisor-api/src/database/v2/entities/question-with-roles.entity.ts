import { DbQuestion } from './question.entity';
import { DbQuestionRole } from './question-role.entity';

export class DbQuestionWithRoles extends DbQuestion {
  questionRoles: DbQuestionRole[];
}
