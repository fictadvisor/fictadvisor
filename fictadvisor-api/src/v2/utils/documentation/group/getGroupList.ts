import { ApiDocumentationParams } from '../decorators';
import { URLResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const GroupDocumentationGetGroupList: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: URLResponse,
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
    description: 'Id of a group',
  }],
};