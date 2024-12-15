import { ApiDocumentationParams } from '../decorators';
import { PaginatedQuestionsResponse } from '@fictadvisor/utils';

export const PollDocumentationGetAll: ApiDocumentationParams = {
  ok: {
    type: PaginatedQuestionsResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Page must be a number
      PageSize must be a number
      Sort must be an enum
      Wrong value for order
      Each answer type should be an enum
      Answer types must be an array`,
  },
};
