import { ApiDocumentationParams } from '../decorators';
import { ResourcesResponse } from '@fictadvisor/utils';

export const ResourceDocumentationGetAll: ApiDocumentationParams = {
  ok: {
    type: ResourcesResponse,
  },
  badRequest: {
    description: `\n
    InvalidQueryException:
      Id\`s must be an array
      Id must be UUID`,
  },
};
