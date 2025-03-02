import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { DefaultForbiddenResponse } from '../../../defaultResponses';

export const UserDocumentationLinkTelegram: ApiDocumentationParams = {
  isAuth: true,
  ok: {},
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      User with such id is not found
      
    InvalidBodyException:
      Auth date must be a number
      Auth date cannot be empty
      First name must be a string
      First name cannot be empty
      Hash must be a string
      Hash cannot be empty
      Telegram id must be a bigint
      Telegram id cannot be empty
      Last name must be a string
      Photo url must be a string
      Username must be a string
      Username cannot be empty`,
  },
  unauthorized: {
    description: `\n
    UnauthorizedException:
      Unauthorized
      
    InvalidTelegramCredentialsException:
      Your telegram hash is invalid`,
  },
  forbidden: DefaultForbiddenResponse,
  conflict: {
    description: `\n
    DuplicateTelegramIdException:
      A user with the same Telegram ID already exists`,
  },
  params: [
    {
      name: 'userId',
      required: true,
      description: 'Id of a user',
    },
  ],
};
