import { QuestionDisplay, QuestionType } from '@prisma/client/fictadvisor';
import { DbQuestionAnswer } from './DbQuestionAnswer';
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
    description?: string;

  @AutoMap()
    text: string;

  @AutoMap()
    isRequired: boolean;

  @AutoMap()
    criteria?: string;

  @AutoMap()
    type: QuestionType;

  @AutoMap()
    display: QuestionDisplay;

  createdAt: Date | null;
  updatedAt: Date | null;

  @AutoMap(() => [DbQuestionAnswer])
    questionAnswers?: DbQuestionAnswer[];
}
