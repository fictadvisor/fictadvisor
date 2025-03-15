import { DbQuestion } from './DbQuestion';
import { DbQuestionRole } from './DbQuestionRole';

export class DbQuestionWithRoles extends DbQuestion {
  questionRoles: DbQuestionRole[];
}
