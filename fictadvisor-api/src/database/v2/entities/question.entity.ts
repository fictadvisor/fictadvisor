import { QuestionDisplay, QuestionType } from '@prisma-client/fictadvisor';
import { DbBaseQuestionAnswer } from './question-answer.entity';
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

  @AutoMap(() => String)
    description: string | null;

  @AutoMap()
    text: string;

  @AutoMap()
    isRequired: boolean;

  @AutoMap(() => String)
    criteria: string | null;

  @AutoMap(() => String)
    type: QuestionType;

  @AutoMap(() => String)
    display: QuestionDisplay;

  createdAt: Date | null;
  updatedAt: Date | null;
}

/** PollService.getQuestionWithMarks: `questionAnswers: { where: ... }` */
export class DbQuestionWithAnswers extends DbQuestion {
  @AutoMap(() => [DbBaseQuestionAnswer])
    questionAnswers: DbBaseQuestionAnswer[];
}

/**
 * All a mark needs: the question's display/type and the raw answer values.
 * `DbQuestionWithAnswers` satisfies it, and SubjectService builds it by hand
 * while regrouping answers across discipline teachers.
 */
export class DbQuestionMark {
  @AutoMap()
    name: string;

  @AutoMap(() => String)
    type: QuestionType;

  @AutoMap(() => String)
    display: QuestionDisplay;

  questionAnswers: { value: string }[];
}
