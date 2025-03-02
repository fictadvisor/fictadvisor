import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { DefaultUnauthorizedResponse } from '../../../defaultResponses';

export const AuthDocumentationRegisterTelegram: ApiDocumentationParams = {
  isAuth: true,
  ok: {},
  unauthorized: DefaultUnauthorizedResponse,
  badRequest: {
    description: `\n
    InvalidBodyException:
      Token cannot be empty
      Token should be string
      Telegram should be number
      Telegram id cannot be empty`,
  },
};
