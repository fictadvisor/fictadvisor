import { ApiDocumentationParams } from '../decorators';
import { GrantsResponse } from '@fictadvisor/utils/responses';

export const RoleDocumentationGetAllGrants: ApiDocumentationParams = {
  ok: {
    type: GrantsResponse,
  },
  badRequest: {
    description: `\n
    InvalidQueryException:
      Page must be a number
      PageSize must be a number
      Search must be a string
      Wrong value for order
      Sort must be an enum
      Set must be an boolean
      
    InvalidEntityIdException:
      Role with such id is not found`,
  },
  params: [{
    name: 'roleId',
    required: true,
    description: 'Id of the role, which grants you want to get',
  }],
};
