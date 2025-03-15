import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { MappedGroupResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses';

export const GroupDocumentationDelete: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: MappedGroupResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      Group with such id is not found`,
  },
  forbidden: DefaultForbiddenResponse,
  unauthorized: DefaultUnauthorizedResponse,
  params: [{
    name: 'groupId',
    required: true,
    description: 'Id of the group to delete',
  }],
};
