import { ApiDocumentationParams } from '../decorators';
import { FAQWithCategoriesResponse } from '@fictadvisor/utils/responses';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const FAQDocumentationUpdate: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: FAQWithCategoriesResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Text is too short (min: 5)
      Text is too long (max: 300)
      Text must be a string
      Answer is too short (min: 2)
      Answer is too long (max: 300)
      Answer must be a string
      Categories must be an array
      Category id must be a string
      Category id must be a UUID
      
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
