import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { SemestersResponse } from '@fictadvisor/utils/responses';

export const DateDocumentationGetAllSemesters: ApiDocumentationParams = {
  ok: {
    type: SemestersResponse,
  },
};
