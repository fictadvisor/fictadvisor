import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { CathedrasDivisionsResponse } from '@fictadvisor/utils/responses';

export const CathedraDocumentationGetAllDivisions: ApiDocumentationParams = {
  ok: {
    type: CathedrasDivisionsResponse,
  },
};
