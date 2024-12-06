import { ApiDocumentationParams } from '../decorators';
import { BaseRoleResponse } from '@fictadvisor/utils/responses';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const RoleDocumentationCreate: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: BaseRoleResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Name must be an enum
      Name cannot be empty
      Weight must be a number 
      Weight cannot be empty
      Weight must be more than 1
      Weight must be less than 5000
      Display name must be a string
      Display name length must be more than 3
      Display name length must be less than 32`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
