import { ApiDocumentationParams } from '../decorators';
import { FAQCategoryWithFAQsResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const FAQCategoryDocumentationDelete: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: FAQCategoryWithFAQsResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      FAQ Category with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
