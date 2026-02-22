import { QuestionDisplay, QuestionType } from '@prisma-client/fictadvisor';
import { DbQuestionAnswer } from './question-answer.entity';
import { AutoMap } from '@automapper/classes';

export class DbQuestion {
  @AutoMap()
    id: string;

  @AutoMap()
    category: string;

  @AutoMap()
    name: string;

  @AutoMap()
    order: number;

  @AutoMap()
    description: string | null;

  @AutoMap()
    text: string;

  @AutoMap()
    isRequired: boolean;

  @AutoMap()
    criteria: string | null;

  @AutoMap(() => String)
    type: QuestionType;

  @AutoMap(() => String)
    display: QuestionDisplay;

  @AutoMap(() => [DbQuestionAnswer])
    questionAnswers?: DbQuestionAnswer[];

  createdAt: Date | null;
  updatedAt: Date | null;
}
