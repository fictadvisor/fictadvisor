import { AuthRefreshResponse } from '@fictadvisor/utils';
import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DefaultUnauthorizedResponse } from '../../../default-responses';

export const AuthDocumentationRefresh: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: AuthRefreshResponse,
  },
  unauthorized: DefaultUnauthorizedResponse,
};
