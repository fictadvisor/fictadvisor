import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { QuestionAnswerResponse } from '@fictadvisor/utils';
import { DefaultUnauthorizedResponse } from '../../../defaultResponses';

export const DisciplineTeacherDocumentationSendResponse: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: QuestionAnswerResponse,
  },
  badRequest: {
    description: `\n
      InvalidBodyException:
        Question id must be a string
        Question id can not be empty
        Value must be a string
        Value can not be empty
        User id must be a string
        User id can not be empty
      
      InvalidEntityIdException:
        DisciplineTeacher with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  params: [
    {
      name: 'disciplineTeacherId',
      required: true,
      description: 'Id of disciplineTeacher',
    },
  ],
};
