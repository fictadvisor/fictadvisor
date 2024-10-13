import { ApiDocumentationParams } from '../decorators';
import { FAQWithCategoriesResponse } from '@fictadvisor/utils/responses';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const FAQDocumentationDelete: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: FAQWithCategoriesResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException
      FAQ with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [{
    name: 'faqId',
    required: true,
    description: 'Id of the FAQ to delete',
  }],
};
