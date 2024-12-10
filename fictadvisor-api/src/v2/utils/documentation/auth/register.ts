import { ApiDocumentationParams } from '../decorators';

export const AuthDocumentationRegister: ApiDocumentationParams = {
  ok: {},
  isAuth: true,
  badRequest: {
    description: `\n
    InvalidBodyException:
      Group id must be UUID
      Group id cannot be empty
      Group id should be string
      First name is not correct (A-Я(укр.)\\-' ), or too short (min: 2), or too long (max: 40)
      First name cannot be empty
      First name must be string
      Middle name is not correct (A-Я(укр.)\\-' ), or too long (max: 40)
      Middle name should be string
      Last name is not correct (A-Я(укр.)\\-' ), or too short (min: 2), or too long (max: 40)
      Last name cannot be empty
      Last name must be string
      isCaptain must be a boolean
      isCaptain cannot be empty
      Username is not correct (a-zA-Z0-9_), or too short (min: 2), or too long (max: 40)
      Username cannot be empty
      Username must be string
      Email is not an email
      Email cannot be empty
      Email must be string
      The password must be between 6 and 32 characters long, include at least 1 digit and 1 latin letter
      Password cannot be empty
      Password must be string
      Avatar must be string
      Telegram id must be a bigint
      Auth date must be a number
      Auth date cannot be empty
      First name must be a string
      First name cannot be empty
      Hash name must be a string
      Hash cannot be empty
      Telegram id must be a bigint
      Telegram id cannot be empty
      Photo url must be a string
                  
    AlreadyRegisteredException:
      User is already registered

    CaptainAlreadyRegisteredException:
      Captain of this group is already registered`,
  },
  unauthorized: {
    description: `\n
    InvalidTelegramCredentialsException:
      Your telegram hash is invalid`,
  },
  tooManyRequests: {
    description: `\n
    TooManyActionsException:
      Too many actions. Try later`,
  },
};
