import { OrdinaryStudentResponse } from '@fictadvisor/utils/responses';
import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { DefaultUnauthorizedResponse } from '../../../defaultResponses';

export const AuthDocumentationGetMe: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: OrdinaryStudentResponse,
  },
  unauthorized: DefaultUnauthorizedResponse,
};
