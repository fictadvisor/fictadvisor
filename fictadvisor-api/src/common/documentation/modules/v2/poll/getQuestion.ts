import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { QuestionWithCategoriesAndRolesResponse } from '@fictadvisor/utils';

export const PollDocumentationGetQuestion: ApiDocumentationParams = {
  ok: {
    type: QuestionWithCategoriesAndRolesResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Question with such id is not found`,
  },
  params: [{
    name: 'questionId',
    required: true,
    description: 'Id of question you want to get',
  }],
};
