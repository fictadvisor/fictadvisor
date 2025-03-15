import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { GrantResponse } from '@fictadvisor/utils/responses';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses.constants';

export const RoleDocumentationDeleteGrant: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: GrantResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Role with such id is not found
      Grant with such id is not found
      
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
