import { DbQuestion } from './question.entity';
import { DbQuestionRole } from './question-role.entity';
import { AutoMap } from '@automapper/classes';

export class DbQuestionWithRoles extends DbQuestion {
  @AutoMap(() => [DbQuestionRole])
    questionRoles: DbQuestionRole[];
}
