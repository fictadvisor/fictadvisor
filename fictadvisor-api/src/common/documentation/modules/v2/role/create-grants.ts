import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses.constants';
import { GrantCountResponse } from '@fictadvisor/utils';

export const RoleDocumentationCreateGrants: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: GrantCountResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Grants must be an array of CreateGrantDTO
      Permission cannot be empty
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
