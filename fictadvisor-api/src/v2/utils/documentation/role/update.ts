import { ApiDocumentationParams } from '../decorators';
import { BaseRoleResponse } from '@fictadvisor/utils/responses';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const RoleDocumentationUpdate: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: BaseRoleResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Name must be an enum
      Weight must be a number
      Weight must be more than 1
      Weight must be less than 5000
      Display name must be a string
      Display name length must be more than 3
      Display name length must be less than 32
      
    InvalidEntityIdException:
      Role with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [{
    name: 'roleId',
    required: true,
    description: 'Id of a role to update it',
  }],
};
