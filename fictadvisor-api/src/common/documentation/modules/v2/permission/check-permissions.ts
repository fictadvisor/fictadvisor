import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { CheckPermissionsResponse } from '@fictadvisor/utils/responses';
import { DefaultUnauthorizedResponse } from '../../../default-responses';

export const PermissionDocumentationCheckPermissions: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: CheckPermissionsResponse,
  },
  badRequest: {
    description: `\n      
    DataNotFoundException:
      Data were not found
      
    InvalidBodyException:
      obj.permissions: permissions must be an array
      obj.permissions: each value in permissions must be one of the following values`,
  },
  unauthorized: DefaultUnauthorizedResponse,
};
