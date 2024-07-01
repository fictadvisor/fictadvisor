import { ApiDocumentationParams } from '../decorators';
import { FAQWithCategoriesResponse } from '@fictadvisor/utils/responses';

export const FAQDocumentationGet: ApiDocumentationParams = {
  ok: {
    type: FAQWithCategoriesResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException
      FAQ with such id is not found`,
  },
  params: [{
    name: 'faqId',
    required: true,
    description: 'Id of the FAQ to delete',
  }],
};
