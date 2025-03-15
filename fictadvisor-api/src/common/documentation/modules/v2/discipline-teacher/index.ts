import { DisciplineTeacherDocumentationGetQuestions } from './get-questions';
import { DisciplineTeacherDocumentationGetQuestionsByTelegram } from './get-questions-by-telegram';
import { DisciplineTeacherDocumentationSendAnswers } from './send-answers';
import { DisciplineTeacherDocumentationSendAnswersByTelegram } from './send-answers-by-telegram';
import { DisciplineTeacherDocumentationSendResponse } from './send-response';
import { DisciplineTeacherDocumentationCreate } from './create';
import { DisciplineTeacherDocumentationUpdateById } from './update-by-id';
import { DisciplineTeacherDocumentationUpdateByTeacherAndDiscipline } from './update-by-teacher-and-discipline';
import { DisciplineTeacherDocumentationDeleteById } from './delete-by-id';
import { DisciplineTeacherDocumentationDeleteByTeacherAndDiscipline } from './delete-by-teacher-and-discipline';
import { DisciplineTeacherDocumentationRemoveDisciplineTeacherFromPoll } from './remove-discipline-teacher-from-poll';
import { DisciplineTeacherDocumentationGetAllComments } from './get-all-comments';
import { DisciplineTeacherDocumentationUpdateComment } from './update-comment';
import { DisciplineTeacherDocumentationDeleteComment } from './delete-comment';

export const DisciplineTeacherDocumentation = {
  CREATE: DisciplineTeacherDocumentationCreate,
  DELETE_BY_ID: DisciplineTeacherDocumentationDeleteById,
  DELETE_BY_TEACHER_ABD_DISCIPLINE: DisciplineTeacherDocumentationDeleteByTeacherAndDiscipline,
  DELETE_COMMENT: DisciplineTeacherDocumentationDeleteComment,
  GET_ALL_COMMENTS: DisciplineTeacherDocumentationGetAllComments,
  GET_QUESTIONS: DisciplineTeacherDocumentationGetQuestions,
  GET_QUESTIONS_BY_TELEGRAM: DisciplineTeacherDocumentationGetQuestionsByTelegram,
  REMOVE_DISCIPLINE_TECHER_FROM_POLL: DisciplineTeacherDocumentationRemoveDisciplineTeacherFromPoll,
  SEND_ANSWERS: DisciplineTeacherDocumentationSendAnswers,
  SEND_ANSWERS_BY_TELEGRAM: DisciplineTeacherDocumentationSendAnswersByTelegram,
  SEND_RESPONSE: DisciplineTeacherDocumentationSendResponse,
  UPDATE_BY_ID: DisciplineTeacherDocumentationUpdateById,
  UPDATE_BY_TEACHER_AND_DISCIPLINE: DisciplineTeacherDocumentationUpdateByTeacherAndDiscipline,
  UPDATE_COMMENT: DisciplineTeacherDocumentationUpdateComment,
};
