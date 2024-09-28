import { ApiDocumentationParams } from '../decorators';
import { CommentResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const DisciplineTeacherDocumentationUpdateComment: ApiDocumentationParams = {
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
      Question id must be a string
      QuestionId cannot be empty
      Comment cannot be empty
      Comment must be a string
      Comment is too short (min: 4)
      Comment is too long (max: 4000)`,
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
