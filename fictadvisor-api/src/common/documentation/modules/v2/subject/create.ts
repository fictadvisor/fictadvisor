import { SubjectResponse } from '@fictadvisor/utils';
import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses.constants';

export const SubjectDocumentationCreate: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: SubjectResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Name must be a string
      Name is too short (min: 5)
      Name is too long (max: 150)
      Name cannot be empty
      Name is incorrect (a-zA-Z0-9A-Я(укр.)\\-' )(/+.,")`,
  },
  forbidden: DefaultForbiddenResponse,
  unauthorized: DefaultUnauthorizedResponse,
};
