import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses';

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
