import { ApiDocumentationParams } from '../decorators';
import { GroupStudentsResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const GroupDocumentationGetStudents: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: GroupStudentsResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      Group with such id is not found

    InvalidBodyException:
      Wrong value for sort
      Wrong value for order`,
  },
  forbidden: DefaultForbiddenResponse,
  unauthorized: DefaultUnauthorizedResponse,
  params: [{
    name: 'groupId',
    required: true,
    description: 'Id of student\'s group',
  }],
};