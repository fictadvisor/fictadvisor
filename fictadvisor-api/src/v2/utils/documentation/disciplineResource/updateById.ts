import { DisciplineResourceResponse } from '@fictadvisor/utils/responses';
import { ApiDocumentationParams } from '../decorators';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const DisciplineResourceDocumentationUpdateById: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: DisciplineResourceResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Name must be string
      Description must be string
      Link must be string
      Subject id must be UUID
      Teacher id must be UUID
      Category id\'s must be an array
      Year must be number
      Semester must be number
      
    InvalidEntityIdException:
      Resource with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [
    {
      name: 'resourceId',
      required: true,
      description: 'Id of specific discipline resource',
    },
  ],
};