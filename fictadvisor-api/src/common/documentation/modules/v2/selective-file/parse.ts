import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { SelectiveParseResponse } from '@fictadvisor/utils/responses';

export const SelectiveFileDocumentationParse: ApiDocumentationParams = {
  ok: {
    type: SelectiveParseResponse,
  },
  badRequest: {
    description: ` \n
      InvalidBodyException:
        Semester must be either 1 or 2
      
      DataNotFoundException:
        Data was not found`,
  },
};
