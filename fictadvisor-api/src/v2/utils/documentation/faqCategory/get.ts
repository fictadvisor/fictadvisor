import { ApiDocumentationParams } from '../decorators';
import { FAQCategoryWithFAQsResponse } from '@fictadvisor/utils';

export const FAQCategoryDocumentationGet: ApiDocumentationParams = {
  ok: {
    type: FAQCategoryWithFAQsResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      FAQ Category with such id is not found`,
  },
};
