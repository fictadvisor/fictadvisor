import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { MappedGroupResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../defaultResponses';

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
