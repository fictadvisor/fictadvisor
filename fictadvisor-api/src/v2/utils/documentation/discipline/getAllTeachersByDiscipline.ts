import { ApiDocumentationParams } from '../decorators';
import { DisciplineTeachersResponse } from '@fictadvisor/utils/responses';
import { DisciplineTypeEnum } from '@fictadvisor/utils/enums';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

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
