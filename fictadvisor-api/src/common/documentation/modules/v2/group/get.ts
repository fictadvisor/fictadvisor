import { MappedGroupResponse } from '@fictadvisor/utils/responses';
import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';

export const GroupDocumentationGet: ApiDocumentationParams = {
  ok: {
    type: MappedGroupResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      Group with such id is not found`,
  },
  params: [{
    name: 'groupId',
    required: true,
    description: 'Id of the group to get',
  }],
};
