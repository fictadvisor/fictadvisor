import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses.constants';

export const GroupDocumentationSwitchRole: ApiDocumentationParams = {
  isAuth: true,
  ok: {},
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      Group with such id is not found
      User with such id is not found

    InvalidBodyException:
      Role name cannot be empty
      Role name must be enum
      Group id must be UUID
      Group id cannot be empty
      User id must be UUID
      User id cannot be empty`,
  },
  forbidden: DefaultForbiddenResponse,
  unauthorized: DefaultUnauthorizedResponse,
  params: [{
    name: 'groupId',
    required: true,
    description: 'Id of the group to switch user role from',
  }, {
    name: 'userId',
    required: true,
    description: 'Id of the user to switch role',
  }],
};
