import { ApiDocumentationParams } from '../decorators';
import { OrdinaryStudentResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const GroupDocumentationSwitchCaptain: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: OrdinaryStudentResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Student id must be UUID
      Student id cannot be empty

    InvalidEntityIdException:
      User with such id is not found
      Group with such id is not found

    StudentIsAlreadyCaptainException:
      The student is already the captain of the group`,
  },
  forbidden: DefaultForbiddenResponse,
  unauthorized: DefaultUnauthorizedResponse,
  params: [{
    name: 'groupId',
    required: true,
    description: 'Id of a group',
  }],
};