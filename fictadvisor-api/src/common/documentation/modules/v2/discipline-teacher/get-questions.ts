import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DisciplineTeacherQuestionsResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses';

export const DisciplineTeacherDocumentationGetQuestions: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: DisciplineTeacherQuestionsResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      DisciplineTeacher with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [
    {
      name: 'disciplineTeacherId',
      required: true,
      description: 'Discipline teacher id',
    },
  ],
};
