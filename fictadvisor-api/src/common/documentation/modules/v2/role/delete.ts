import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { BaseRoleResponse } from '@fictadvisor/utils/responses';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../defaultResponses';

export const RoleDocumentationDelete: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: BaseRoleResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Role with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [{
    name: 'roleId',
    required: true,
    description: 'Id of the role to delete it',
  }],
};
