import { AutoMap } from '@automapper/classes';
import { DbQuestion } from './DbQuestion';
import { DbQuestionRole } from './DbQuestionRole';

export class DbQuestionWithRoles extends DbQuestion {
  @AutoMap(() => [DbQuestionRole])
    questionRoles: DbQuestionRole[];
}
