import { DisciplineTypeEnum } from '@prisma-client/fictadvisor';
import { DbQuestion } from './question.entity';
import { AutoMap } from '@automapper/classes';

export class DbQuestionRole {
  @AutoMap(() => String)
    role: DisciplineTypeEnum;

  @AutoMap(() => DbQuestion)
    question?: DbQuestion;

  @AutoMap()
    questionId: string;

  @AutoMap()
    isShown: boolean;

  @AutoMap()
    isRequired: boolean;

  createdAt: Date;
  updatedAt: Date;
}
