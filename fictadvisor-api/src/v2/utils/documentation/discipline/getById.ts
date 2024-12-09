import { ApiDocumentationParams } from '../decorators';
import { ExtendedDisciplineTeachersResponse } from '@fictadvisor/utils/responses';

export const disciplineDocumentationGetById: ApiDocumentationParams = {
  ok: {
    type: ExtendedDisciplineTeachersResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Discipline with such id is not found`,
  },
  params: [{
    name: 'disciplineId',
    required: true,
    description: 'Id of a discipline to get',
  }],
};
