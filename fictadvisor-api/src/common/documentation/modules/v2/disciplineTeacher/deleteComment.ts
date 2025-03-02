import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { CommentResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../defaultResponses';

export const DisciplineTeacherDocumentationDeleteComment: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: CommentResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      User with such id is not found
      Question with such id is not found
      DisciplineTeacher with such id is not found
      
    InvalidTypeException
      Question has wrong type
      
    InvalidBodyException:
      UserId must be a string
      UserId cannot be empty
      QuestionId must be a string
      QuestionId cannot be empty`,
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
