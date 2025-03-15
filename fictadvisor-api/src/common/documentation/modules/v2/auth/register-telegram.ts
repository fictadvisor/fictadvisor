import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DefaultUnauthorizedResponse } from '../../../default-responses.constants';

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
