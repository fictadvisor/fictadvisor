import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { UserResponse } from '@fictadvisor/utils';
import { DefaultUnauthorizedResponse } from '../../../default-responses.constants';

export const UserDocumentationCreateUser: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: UserResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Username is too short (min: 2)
      Username is too long (max: 40)
      Username is incorrect (a-zA-Z0-9_)
      Username cannot be empty
      Email must be a valid email
      Email cannot be empty
      State must be an enum
      State cannot be empty

    AlreadyRegisteredException:
      User is already registered`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultUnauthorizedResponse,
};
