import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { BaseRoleResponse } from '@fictadvisor/utils/responses';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses.constants';

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
