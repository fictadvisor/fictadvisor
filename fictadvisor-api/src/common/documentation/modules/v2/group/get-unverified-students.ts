import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { StudentsResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses';

export const GroupDocumentationGetUnverifiedStudents: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: StudentsResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      Group with such id is not found`,
  },
  forbidden: DefaultForbiddenResponse,
  unauthorized: DefaultUnauthorizedResponse,
  params: [{
    name: 'groupId',
    required: true,
    description: 'Id of a group',
  }],
};
