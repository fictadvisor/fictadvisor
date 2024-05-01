import { DisciplineResourceResponse } from '@fictadvisor/utils/responses';
import { ApiDocumentationParams } from '../decorators';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const DisciplineResourceDocumentationCreate: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: DisciplineResourceResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Name must be string
      Name cannot be empty
      Description must be string
      Link must be string
      Link cannot be empty
      Subject id must be UUID
      Subject id cannot be empty
      Teacher id must be UUID
      Teacher id cannot be empty
      Category id\'s must be an array
      Year must be number
      Year cannot be empty
      Semester must be number
      Semester cannot be empty`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};