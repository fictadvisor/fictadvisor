import { ApiDocumentationParams } from '../decorators';
import { AuthLoginResponse } from '@fictadvisor/utils';

export const AuthDocumentationUpdatePassword: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: AuthLoginResponse,
  },
  unauthorized: {
    description: `\n
    UnauthorisedException:
      Unauthorized
      Use forgot password to get access to your account
      The password is incorrect`,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      User with such id is not found
      
    InvalidBodyException:
      The password must be between 6 and 32 characters long, include at least 1 digit and 1 latin letter
      Old password cannot be empty
      New password cannot be empty

    PasswordRepeatException:
      The passwords are the same`,
  },
};
