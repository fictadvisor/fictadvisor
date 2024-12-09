import { ApiDocumentationParams } from '../decorators';
import { ExtendedDisciplineTeachersResponse } from '@fictadvisor/utils/responses';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const disciplineDocumentationDeleteById: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: ExtendedDisciplineTeachersResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Discipline with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [{
    name: 'disciplineId',
    required: true,
    description: 'Id of a discipline to delete',
  }],
};
