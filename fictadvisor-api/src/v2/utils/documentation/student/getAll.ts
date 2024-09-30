import { SimpleStudentsResponse } from '@fictadvisor/utils/responses';
import { ApiDocumentationParams } from '../decorators';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const StudentDocumentationGetAll: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: SimpleStudentsResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      Group with such id is not found
    
    InvalidBodyException:
      Sort must be an enum
      Wrong value for order
      Groups must be an array
      Roles must be an array
      Each element of roles should be an enum
      States must be an array
      Each element of states must be an enum
      Page must be a number
      PageSize must be a number`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};