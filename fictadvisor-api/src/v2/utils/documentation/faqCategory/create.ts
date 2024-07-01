import { ApiDocumentationParams } from '../decorators';
import { FAQCategoryWithFAQsResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const FAQCategoryDocumentationCreate: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: FAQCategoryWithFAQsResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Name cannot be empty
      Name must be a string
      Name is too short (min: 2)
      Name is too long (max: 20)`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
