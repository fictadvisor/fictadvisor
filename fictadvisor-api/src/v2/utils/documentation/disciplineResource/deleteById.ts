import { DisciplineResourceResponse } from '@fictadvisor/utils/responses';
import { ApiDocumentationParams } from '../decorators';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const DisciplineResourceDocumentationDeleteById: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: DisciplineResourceResponse,
  },
  badRequest: {
    description: `\n
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