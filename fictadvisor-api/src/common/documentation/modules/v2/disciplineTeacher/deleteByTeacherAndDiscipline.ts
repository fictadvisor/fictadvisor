import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../defaultResponses';

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
