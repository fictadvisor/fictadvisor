import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses';

export const DisciplineTeacherDocumentationSendAnswers: ApiDocumentationParams = {
  isAuth: true,
  ok: {},
  badRequest: {
    description: `\n
    InvalidBodyException: 
      Question id must be a string
      Question id can not be empty
      Value must be a string
      Value can not be empty
      
    ExcessiveAnswerException: 
      There are excessive answers in the request
      
    NotEnoughAnswersException: 
      There are not enough answers
      
    AlreadyAnsweredException: 
      This question is already answered`,
  },
  params: [
    {
      name: 'disciplineTeacherId',
      required: true,
      description: 'Id of disciplineTeacher',
    },
  ],
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
