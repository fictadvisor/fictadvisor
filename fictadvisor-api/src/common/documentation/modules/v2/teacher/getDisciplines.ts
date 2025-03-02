import { DisciplineTeacherAndSubjectResponse } from '@fictadvisor/utils/responses';
import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../defaultResponses';

export const TeacherDocumentationGetDisciplines: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: [DisciplineTeacherAndSubjectResponse],
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      Teacher with such id is not found
      User with such id is not found`,
  },
  forbidden: DefaultForbiddenResponse,
  unauthorized: DefaultUnauthorizedResponse,
  params: [
    {
      name: 'teacherId',
      required: true,
      description: 'Id of certain teacher',
    },
  ],
  queries: [
    {
      name: 'notAnswered',
      type: Boolean,
      description: 'Answer result',
    },
    {
      name: 'userId',
      type: String,
      description: 'Id of certain user',
    },
  ],
};
