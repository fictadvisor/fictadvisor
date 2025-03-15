import { PollDocumentationGetAll } from './get-all';
import { PollDocumentationCreate } from './create';
import { PollDocumentationGetPollDisciplineTeachers } from './get-poll-discipline-teachers';
import { PollDocumentationDelete } from './delete';
import { PollDocumentationUpdate } from './update';
import { PollDocumentationGetQuestion } from './get-question';
import { PollDocumentationGiveRole } from './give-role';
import { PollDocumentationDeleteRole } from './delete-role';

export const PollDocumentation = {
  GET_ALL: PollDocumentationGetAll,
  CREATE: PollDocumentationCreate,
  GET_POLL_DISCIPLINE_TEACHERS: PollDocumentationGetPollDisciplineTeachers,
  DELETE: PollDocumentationDelete,
  UPDATE: PollDocumentationUpdate,
  GET_QUESTION: PollDocumentationGetQuestion,
  GIVE_ROLE: PollDocumentationGiveRole,
  DELETE_ROLE: PollDocumentationDeleteRole,
};
