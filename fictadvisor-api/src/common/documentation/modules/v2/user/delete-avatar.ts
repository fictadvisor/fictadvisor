import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { UserResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses';

export const UserDocumentationDeleteAvatar: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: UserResponse,
    description: 'Deleted user\'s avatar',
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      User with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [
    {
      name: 'userId',
      required: true,
      description: 'Id of a user',
    },
  ],
};
