import { ApiDocumentationParams } from '../decorators';
import { FAQCategoriesWithFAQsResponse } from '@fictadvisor/utils';

export const FAQCategoryDocumentationGetAll: ApiDocumentationParams = {
  ok: {
    type: FAQCategoriesWithFAQsResponse,
  },
};
