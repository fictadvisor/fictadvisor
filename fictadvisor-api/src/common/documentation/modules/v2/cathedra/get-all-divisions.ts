import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { CathedrasDivisionsResponse } from '@fictadvisor/utils/responses';

export const CathedraDocumentationGetAllDivisions: ApiDocumentationParams = {
  ok: {
    type: CathedrasDivisionsResponse,
  },
};
