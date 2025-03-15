import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { UserResponse } from '@fictadvisor/utils/responses';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses';

export const GroupDocumentationGetCaptain: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: UserResponse,
  },
  badRequest: {
    description: `\n
    InvalidGroupIdException: 
      Group with such id is not found

    AbsenceOfCaptainException:
      Captain was not found`,
  },
  forbidden: DefaultForbiddenResponse,
  unauthorized: DefaultUnauthorizedResponse,
  params: [{
    name: 'groupId',
    required: true,
    description: 'Id of the group to get the captain from',
  }],
};
