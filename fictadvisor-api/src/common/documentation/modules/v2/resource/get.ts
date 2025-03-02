import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { ResourceResponse } from '@fictadvisor/utils';

export const ResourceDocumentationGet: ApiDocumentationParams = {
  ok: {
    type: ResourceResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityId:
      Resource with such id is not found`,
  },
  params: [
    {
      name: 'resourceId',
      description: 'Id of student resource',
      type: String,
      required: true,
    },
  ],
};
