import { ApiDocumentationParams } from '../decorators';
import { GrantResponse } from '@fictadvisor/utils/responses';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const RoleDocumentationCreateGrant: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: GrantResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Permission cannot be empty
      Permission must be a string
      Permission must be more then 3 chars
      Permission must be less then 200 chars
      Set is not a boolean
      Weight must be a number
      Weight cannot be empty
      Weight must be more then 1
      Weight must be less then 5000
      
    InvalidEntityIdException:
      Role with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [{
    name: 'roleId',
    required: true,
    description: 'Id of certain role',
  }],
};
