import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DisciplineTeacherQuestionsResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses';

export const DisciplineTeacherDocumentationGetQuestionsByTelegram: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: DisciplineTeacherQuestionsResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      DisciplineTeacher with such id is not found`,
  },
  params: [
    {
      name: 'disciplineTeacherId',
      required: true,
      description: 'Id of disciplineTeacher',
    },
  ],
  queries: [
    {
      name: 'userId',
      required: true,
      description: 'Id of the user',
    },
  ],
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
