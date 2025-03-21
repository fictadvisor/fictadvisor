import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { OrdinaryStudentResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses.constants';

export const GroupDocumentationVerifyStudent: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: OrdinaryStudentResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      Group with such id is not found
      User with such id is not found

    InvalidBodyException:
      State is must be an enum
      State cannot be empty
      IsCaptain must be a boolean
      IsCaptain can not be empty
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
    description: 'Id of the group to verify user from',
  }, {
    name: 'userId',
    required: true,
    description: 'Id of the user to verify',
  }],
};
