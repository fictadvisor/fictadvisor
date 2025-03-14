import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { UsersResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../defaultResponses';

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
