import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { SelectiveFileResponse } from '@fictadvisor/utils/responses';

export const SelectiveFileDocumentationUpload: ApiDocumentationParams = {
  ok: {
    type: SelectiveFileResponse,
  },
  badRequest: {
    description: ` \n
      InvalidBodyException:
        Year cannot be empty
        Year must be of type number
      
      DataNotFoundException:
        File was not attached
      
      InvalidExtensionException:
        File extension is wrong
      
      TooLargeSizeException:
        The file size exceeds 5 MB`,
  },
};
