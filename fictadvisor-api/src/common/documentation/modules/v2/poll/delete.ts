import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { QuestionWithCategoryResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses';

export const PollDocumentationDelete: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: QuestionWithCategoryResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Question with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [{
    name: 'questionId',
    required: true,
    description: 'Id of question you want to delete',
  }],
};
