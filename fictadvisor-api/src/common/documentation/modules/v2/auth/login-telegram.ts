import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { AuthLoginResponse } from '@fictadvisor/utils';

export const AuthDocumentationLoginTelegram: ApiDocumentationParams = {
  ok: {
    type: AuthLoginResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Auth date must be a number
      Auth date cannot be empty
      First name must be a string
      First name cannot be empty
      Hash name must be a string
      Hash cannot be empty
      Telegram id must be a bigint
      Telegram id cannot be empty
      Last name must be a string
      Photo url must be a string
      Username must be a string
      Username cannot be empty
      
    InvalidEntityIdException
      User with such id is not found`,
  },
  unauthorized: {
    description: `\n
    InvalidTelegramCredentialsException:
      Your telegram hash is invalid`,
  },
};
