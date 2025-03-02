import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../defaultResponses';

export const DisciplineTeacherDocumentationRemoveDisciplineTeacherFromPoll: ApiDocumentationParams = {
  isAuth: true,
  ok: {},
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      DisciplineTeacher with such id is not found

    NotSelectedDisciplineException:
      Current discipline is not selected by this student`,
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
