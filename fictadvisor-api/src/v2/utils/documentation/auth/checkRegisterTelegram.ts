import { TelegramRegistrationResponse } from '@fictadvisor/utils/responses';
import { ApiDocumentationParams } from '../decorators';

export const AuthDocumentationCheckRegisterTelegram: ApiDocumentationParams = {
  ok: {
    type: TelegramRegistrationResponse,
  },
  params: [
    {
      name: 'token',
      required: true,
      description: 'The token used to check the Telegram registration status',
    },
  ],
};
