import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../defaultResponses';

export const DisciplineTeacherDocumentationDeleteById: ApiDocumentationParams = {
  isAuth: true,
  ok: {},
  badRequest: {
    description: `\n
      InvalidEntityIdException:
        disciplineTeacher with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [
    {
      name: 'disciplineTeacherId',
      required: true,
      description: 'Id of the disciplineTeacher',
    },
  ],
};
