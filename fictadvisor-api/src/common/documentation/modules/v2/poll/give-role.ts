import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { QuestionWithCategoriesAndRolesResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses';

export const PollDocumentationGiveRole: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: QuestionWithCategoriesAndRolesResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException: 
      Role cannot be empty
      Role must be enum
      Visibility parameter cannot be empty
      Visibility parameter must be a boolean
      Requirement parameter cannot be empty
      Requirement parameter must be a boolean

    InvalidEntityIdException:
      Question with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [{
    name: 'questionId',
    required: true,
    description: 'Id of the question to which you want to attach the role',
  }],
};
