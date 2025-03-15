import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { RolesResponse } from '@fictadvisor/utils/responses';

export const RoleDocumentationGetAll: ApiDocumentationParams = {
  ok: {
    type: RolesResponse,
  },
  badRequest: {
    description: `\n
    InvalidQueryException:
      Page must be a number
      PageSize must be a number
      Search must be a string
      Wrong value for order
      Group id must be a UUID
      Sort must be an enum
      Name must be an enum`,
  },
};
