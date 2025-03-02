import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { RoleResponse } from '@fictadvisor/utils/responses';

export const RoleDocumentationGet: ApiDocumentationParams = {
  ok: {
    type: RoleResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Role with such id is not found`,
  },
  params: [{
    name: 'roleId',
    required: true,
    description: 'Id of the role to get information about it',
  }],
};
