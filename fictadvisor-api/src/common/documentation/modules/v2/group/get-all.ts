import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { PaginatedGroupsResponse } from '@fictadvisor/utils';

export const GroupDocumentationGetAll: ApiDocumentationParams = {
  ok: {
    type: PaginatedGroupsResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException: 
      Specialties must be an array
      Cathedras must be an array
      Courses must be an array
      Min course value is 1
      Max course value is 4
      Wrong value for order
      Page must be a number
      PageSize must be a number`,
  },
};
