import { ApiDocumentationParams } from '../decorators';
import { FAQWithCategoriesResponse } from '@fictadvisor/utils/responses';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const FAQDocumentationCreate: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: FAQWithCategoriesResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Text can not be empty
      Text is too short (min: 10)
      Text is too long (max: 300)
      Text must be a string
      Answer can not be empty
      Answer is too short (min: 2)
      Answer is too long (max: 300)
      Answer must be a string
      Categories must be an array
      Categories can not be empty
      Categories must be a string
      Categories must be a UUID`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
