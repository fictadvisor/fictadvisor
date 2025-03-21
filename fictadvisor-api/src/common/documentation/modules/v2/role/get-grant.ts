import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { GrantResponse } from '@fictadvisor/utils/responses';

export const RoleDocumentationGetGrant: ApiDocumentationParams = {
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
  params: [
    {
      name: 'roleId',
      required: true,
      description: 'Id of the role, which grants you want to get',
    },
    {
      name: 'grantId',
      required: true,
      description: 'Id of the certain grant',
    },
  ],
};
