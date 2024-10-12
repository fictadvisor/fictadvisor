import { ApiDocumentationParams } from '../decorators';
import { CathedrasDivisionsResponse } from '@fictadvisor/utils/responses';

export const CathedraDocumentationGetAllDivisions: ApiDocumentationParams = {
  ok: {
    type: CathedrasDivisionsResponse,
  },
};
