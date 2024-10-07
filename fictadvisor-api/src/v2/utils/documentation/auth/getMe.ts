import { ApiDocumentationParams } from '../decorators';
import { OrdinaryStudentResponse } from '@fictadvisor/utils';
import { DefaultUnauthorizedResponse } from '../defaultResponses';

export const AuthDocumentationGetMe: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: OrdinaryStudentResponse,
  },
  unauthorized: DefaultUnauthorizedResponse,
};
