import { ApiDocumentationParams } from 'src/v2/utils/documentation/decorators';
import { UserResponse } from '@fictadvisor/utils/responses';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

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
