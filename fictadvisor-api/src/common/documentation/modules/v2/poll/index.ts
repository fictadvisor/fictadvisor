import { PollDocumentationGetAll } from './getAll';
import { PollDocumentationCreate } from './create';
import { PollDocumentationGetPollDisciplineTeachers } from './getPollDisciplineTeachers';
import { PollDocumentationDelete } from './delete';
import { PollDocumentationUpdate } from './update';
import { PollDocumentationGetQuestion } from './getQuestion';
import { PollDocumentationGiveRole } from './giveRole';
import { PollDocumentationDeleteRole } from './deleteRole';

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
