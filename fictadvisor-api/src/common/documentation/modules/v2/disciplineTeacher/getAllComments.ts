import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { PaginatedCommentsResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../defaultResponses';

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
