import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { UserResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../defaultResponses';

export const UserDocumentationUpdateUser: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: UserResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException: 
      Username is too short (min: 2)
      Username is too long (max: 40)
      Username is not correct (a-zA-Z0-9_)
      State must be an enum
      Avatar link is too long (max: 400)
      Email is not an email
      Email must be valid email

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
