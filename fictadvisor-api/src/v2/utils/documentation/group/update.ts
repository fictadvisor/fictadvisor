import { ApiDocumentationParams } from '../decorators';
import { MappedGroupResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const GroupDocumentationUpdate: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: MappedGroupResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      Group with such id is not found

    InvalidBodyException: 
      Proper name is expected
      Code must be a string
      Captain id must be a string
      Captain id must be UUID
      Educational program id must be a string
      Educational program id must be UUID
      Cathedra id must be a string
      Cathedra id must be UUID
      Moderator ids must be an array
      Moderator id must be a string
      Moderator id must be UUID
      Admission year must be a number`,
  },
  forbidden: DefaultForbiddenResponse,
  unauthorized: DefaultUnauthorizedResponse,
  params: [{
    name: 'groupId',
    required: true,
    description: 'Id of the group to update',
  }],
};