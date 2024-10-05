import { AuthRefreshResponse } from '@fictadvisor/utils';
import { ApiDocumentationParams } from '../decorators';
import { DefaultUnauthorizedResponse } from '../defaultResponses';

export const AuthDocumentationRefresh: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: AuthRefreshResponse,
  },
  unauthorized: DefaultUnauthorizedResponse,
};
