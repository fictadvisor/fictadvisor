import { ApiDocumentationParams } from '../decorators';
import { CathedraWithTeachersResponse } from '@fictadvisor/utils/responses';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const CathedraDocumentationDelete: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: CathedraWithTeachersResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Cathedra with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [
    {
      name: 'cathedraId',
      required: true,
      description: 'Id of a cathedra to delete',
    },
  ],
};
