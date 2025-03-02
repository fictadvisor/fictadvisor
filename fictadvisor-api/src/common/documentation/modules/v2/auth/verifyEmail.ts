import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { JWTTokensResponse } from '@fictadvisor/utils';

export const AuthDocumentationVerifyEmail: ApiDocumentationParams = {
  ok: {
    type: JWTTokensResponse,
  },
  badRequest: {
    description: `\n
    InvalidVerificationTokenException:
      Verification token is expired or invalid

    AlreadyRegisteredException
      User is already registered`,
  },
  params: [
    {
      name: 'token',
      required: true,
      description: 'A verification token that is generated and sent to the user\'s email address.',
    },
  ],
};
