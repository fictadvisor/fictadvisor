import { DisciplineTeacherDocumentationGetQuestions } from './getQuestions';
import { DisciplineTeacherDocumentationGetQuestionsByTelegram } from './getQuestionsByTelegram';
import { DisciplineTeacherDocumentationSendAnswers } from './sendAnswers';
import { DisciplineTeacherDocumentationSendAnswersByTelegram } from './sendAnswersByTelegram';
import { DisciplineTeacherDocumentationSendResponse } from './sendResponse';
import { DisciplineTeacherDocumentationCreate } from './create';
import { DisciplineTeacherDocumentationUpdateById } from './updateById';
import { DisciplineTeacherDocumentationUpdateByTeacherAndDiscipline } from './updateByTeacherAndDiscipline';
import { DisciplineTeacherDocumentationDeleteById } from './deleteById';
import { DisciplineTeacherDocumentationDeleteByTeacherAndDiscipline } from './deleteByTeacherAndDiscipline';
import { DisciplineTeacherDocumentationRemoveDisciplineTeacherFromPoll } from './removeDisciplineTeacherFromPoll';
import { DisciplineTeacherDocumentationGetAllComments } from './getAllComments';
import { DisciplineTeacherDocumentationUpdateComment } from './updateComment';
import { DisciplineTeacherDocumentationDeleteComment } from './deleteComment';

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
