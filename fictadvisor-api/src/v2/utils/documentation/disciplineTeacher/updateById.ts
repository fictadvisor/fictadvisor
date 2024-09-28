import { ApiDocumentationParams } from '../decorators';
import { DisciplineTeacherExtendedResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const DisciplineTeacherDocumentationUpdateById: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: DisciplineTeacherExtendedResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      DisciplineTeacher with such id is not found

    InvalidBodyException:
      Roles cannot be empty
      Roles must be an array
      Each element of roles must be an enum`,
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
