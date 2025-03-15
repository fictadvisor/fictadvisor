import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { UsersResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses.constants';

export const UserDocumentationGetAll: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: UsersResponse,
  },
  badRequest: {
    description: `\n
    InvalidQueryException:
      Page must be a number
      PageSize must be a number
      Search must be a string
      Wrong value for order
      Sort must be an enum
      Each element of states must be an enum`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
