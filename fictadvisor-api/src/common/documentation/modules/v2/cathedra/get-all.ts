import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { PaginatedCathedrasWithTeachersResponse } from '@fictadvisor/utils/responses';

export const CathedraDocumentationGetAll: ApiDocumentationParams = {
  ok: {
    type: PaginatedCathedrasWithTeachersResponse,
  },
  badRequest: {
    description: `\n
    InvalidQueryException:
      Search must be string
      Abbreviation must be string
      Page must be a number
      PageSize must be a number
      Wrong value for order
      Faculties must be an array
      Sort must be an enum`,
  },
};
