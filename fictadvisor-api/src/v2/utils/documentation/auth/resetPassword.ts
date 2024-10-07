import { ApiDocumentationParams } from '../decorators';
import { ResetPasswordResponse } from '@fictadvisor/utils';

export const AuthDocumentationResetPassword: ApiDocumentationParams = {
  ok: {
    type: ResetPasswordResponse,
  },
  badRequest: {
    description: `\n
    InvalidResetTokenException:
      Reset token is expired or invalid
    
    InvalidBodyException:
      The password must be between 6 and 32 characters long, include at least 1 digit and 1 latin letter
      Password cannot be empty`,
  },
  params: [
    {
      name: 'token',
      required: true,
      description: 'A password reset token that is generated and sent to the user\'s email address.',
    },
  ],
};
