import { ApiDocumentationParams } from '../decorators';
import { FAQCategoryWithFAQsResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const FAQCategoryDocumentationUpdate: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: FAQCategoryWithFAQsResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Name must be a string
      Name is too short (min: 2)
      Name is too long (max: 20)
      
    InvalidEntityIdException:
      FAQ Category with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
