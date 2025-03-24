import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { PaginatedSubjectsResponse } from '@fictadvisor/utils';

export const SubjectDocumentationGetAll: ApiDocumentationParams = {
  ok: {
    type: PaginatedSubjectsResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      GroupId must be a valid UUID v4
      GroupId must be a string 
      Page must be a number
      PageSize must be a number
      Search must be a string
      Sort must be a string
      Wrong value for order`,
  },
};
