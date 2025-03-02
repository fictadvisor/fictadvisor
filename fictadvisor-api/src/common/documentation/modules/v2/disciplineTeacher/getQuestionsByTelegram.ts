import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { DisciplineTeacherQuestionsResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../defaultResponses';

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
