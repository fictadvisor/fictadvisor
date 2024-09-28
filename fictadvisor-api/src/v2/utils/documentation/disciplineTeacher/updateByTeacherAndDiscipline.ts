import { ApiDocumentationParams } from '../decorators';
import { DisciplineTeacherExtendedResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const DisciplineTeacherDocumentationUpdateByTeacherAndDiscipline: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: DisciplineTeacherExtendedResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      Discipline with such id is not found
      Teacher with such id is not found
      
    InvalidBodyException:
      Roles cannot be empty
      Roles must be an array
      Each element of roles must be an enum`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  queries: [
    {
      name: 'disciplineId',
      required: true,
      description: 'Id of the discipline',
    },
    {
      name: 'teacherId',
      required: true,
      description: 'Id of the teacher',
    },
  ],
};
