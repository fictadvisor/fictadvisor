import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { SelectiveFilesResponse } from '@fictadvisor/utils/responses';

export const SelectiveFileDocumentationGetAll: ApiDocumentationParams = {
  ok: {
    type: SelectiveFilesResponse,
  },
};
