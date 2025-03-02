import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { IsAvailableResponse } from '@fictadvisor/utils/responses';

export const AuthDocumentationCheckResetToken: ApiDocumentationParams = {
  ok: {
    type: IsAvailableResponse,
  },
  params: [
    {
      name: 'token',
      required: true,
      description: 'The reset token to be checked for availability',
    },
  ],
};
