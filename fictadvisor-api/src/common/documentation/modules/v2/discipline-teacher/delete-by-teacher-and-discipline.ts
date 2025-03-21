import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses.constants';

export const DisciplineTeacherDocumentationDeleteByTeacherAndDiscipline: ApiDocumentationParams = {
  isAuth: true,
  ok: {},
  badRequest: {
    description: `\n
      InvalidEntityIdException:
        Teacher with such id is not found
        Discipline with such id is not found
        DisciplineTeacher with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  queries: [
    {
      name: 'teacherId',
      required: true,
      description: 'Id of the teacher',
    },
    {
      name: 'disciplineId',
      required: true,
      description: 'Id of the discipline',
    },
  ],
};
