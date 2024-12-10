import { ApiDocumentationParams } from '../decorators';
import { GrantResponse } from '@fictadvisor/utils/responses';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const RoleDocumentationUpdateGrant: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: GrantResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Role with such id is not found
      Grant with such id is not found
      
    InvalidBodyException:
      Permission must be a string
      Permission can not be less then 3 chars
      Permission can not be longer then 200 chars
      Set must be boolean
      Weight must be a number
      Weight can not be less then 1
      Weight can not be bigger then 5000
      
    NotBelongException
      This grant does not belong to this role`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [
    {
      name: 'roleId',
      required: true,
      description: 'Id of certain role',
    },
    {
      name: 'grantId',
      required: true,
      description: 'Id of certain grant',
    },
  ],
};
