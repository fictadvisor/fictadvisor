import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DisciplineTeachersResponse } from '@fictadvisor/utils/responses';
import { DisciplineTypeEnum } from '@fictadvisor/utils/enums';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses.constants';

export const disciplineDocumentationGetAllTeachersByDiscipline: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: DisciplineTeachersResponse,
  },
  badRequest: {
    description: `\n
    InvalidQueryException:
      Validation failed (enum string is expected)
      
    InvalidDisciplineIdException:
      Discipline with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [{
    name: 'disciplineId',
    required: true,
    description: 'Id of certain discipline',
  }],
  queries: [{
    name: 'disciplineType',
    required: true,
    enum: DisciplineTypeEnum,
    description: 'Discipline type of some discipline',
  }],
};
