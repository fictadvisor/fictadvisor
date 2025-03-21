import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses.constants';

export const DisciplineTeacherDocumentationSendAnswersByTelegram: ApiDocumentationParams = {
  isAuth: true,
  ok: {},
  badRequest: {
    description: `\n
    InvalidBodyException: 
      Question id must be a string
      Question id cannot be empty
      Value must be a string
      Value cannot be empty
      User id must be a string
      User id cannot be empty
      
    InvalidEntityIdException:
      User with such id is not found
      
    ExcessiveAnswerException: 
      There are excessive answers in the request
      
    NotEnoughAnswersException: 
      There are not enough answers
      
    AlreadyAnsweredException: 
      This question is already answered`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
