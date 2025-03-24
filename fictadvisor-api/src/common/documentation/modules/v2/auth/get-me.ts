import { OrdinaryStudentResponse } from '@fictadvisor/utils/responses';
import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DefaultUnauthorizedResponse } from '../../../default-responses.constants';

export const AuthDocumentationGetMe: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: OrdinaryStudentResponse,
  },
  unauthorized: DefaultUnauthorizedResponse,
};
