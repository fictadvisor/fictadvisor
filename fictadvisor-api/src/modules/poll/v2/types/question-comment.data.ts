import { PaginatedData } from '../../../../database/types/paginated.data';
import { DbQuestion } from '../../../../database/v2/entities/question.entity';
import { DbQuestionAnswerWithDiscipline } from '../../../../database/v2/entities/question-answer.entity';

/**
 * The answer shape PollService.getQuestionWithText loads. It carries no extra
 * fields — it exists so automapper has a token distinct from the entity's own
 * maps for the `Comment` mapping.
 */
export class CommentData extends DbQuestionAnswerWithDiscipline {}

/** A text question with its paginated comments, as returned by getQuestionWithText. */
export class QuestionCommentData extends DbQuestion {
  comments: PaginatedData<CommentData>;
}
