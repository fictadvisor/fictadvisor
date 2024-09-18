import { ApiDocumentationParams } from '../decorators';
import { UserResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

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
