import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { ExtendedDisciplineTeachersResponse } from '@fictadvisor/utils/responses';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses.constants';

export const disciplineDocumentationUpdateById: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: ExtendedDisciplineTeachersResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Discipline with such id is not found

    InvalidBodyException:
      isSelective property must be boolean`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [{
    name: 'disciplineId',
    required: true,
    description: 'Id of a discipline to update',
  }],
};
