import { ApiDocumentationParams } from '../decorators';
import { RoleResponse } from '@fictadvisor/utils/responses';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const RoleDocumentationCreateWithGrants: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: RoleResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      ParentId with such id is not found
      
    InvalidBodyException:
      Parent id must be a UUID
      Grants must be an array of CreateGrantDTO
      Name must be an enum
      Name cannot be empty
      Weight must be a number 
      Weight cannot be empty
      Weight must be more then 1
      Weight must be less than 5000
      Display name length must be more than 3
      Display name length must be less than 32
      Permission cannot be empty
      Permission must be more then 3 chars
      Permission must be less then 200 chars
      Set must be a boolean`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
