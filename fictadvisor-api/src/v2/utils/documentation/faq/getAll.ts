import { ApiDocumentationParams } from '../decorators';
import { PaginatedFAQsWithCategoriesResponse } from '@fictadvisor/utils';

export const FAQDocumentationGetAll: ApiDocumentationParams = {
  ok: {
    type: PaginatedFAQsWithCategoriesResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException
      Categories must be an array
      Each category must be a string
      Each category must be a UUID
      Page must be a number
      PageSize must be a number
      Search must be a string
      Sort must be a string
      Sort must be a enum
      Wrong value for order`,
  },
};
