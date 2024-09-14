import { ApiDocumentationParams } from 'src/v2/utils/documentation/decorators';
import { PaginatedTeachersResponse } from '@fictadvisor/utils/responses';

export const TeacherDocumentationGetAll: ApiDocumentationParams = {
  ok: {
    type: PaginatedTeachersResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Page must be a number
      PageSize must be a number
      Wrong value for order
      Sort must be an enum
      Cathedras must be an array
      Each element of roles should be an enum
      Roles must be an array
      
    InvalidEntityException:
      Group with such id is not found
      Cathedra with such id is not found`,
  },
};
