import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { PaginatedCommentsResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses.constants';

export const DisciplineTeacherDocumentationGetAllComments: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: PaginatedCommentsResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException: 
      Page must be a number
      PageSize must be a number
      Sort must be an enum
      Wrong value for order
      Each value of semesters must be an studying semester`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
