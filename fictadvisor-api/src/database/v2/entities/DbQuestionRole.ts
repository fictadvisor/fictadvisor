import { DbQuestion } from './DbQuestion';
import { DisciplineTypeEnum } from '@prisma/client/fictadvisor';
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
