import { ApiDocumentationParams } from '../decorators';

export const AuthDocumentationRequestEmailVerification: ApiDocumentationParams = {
  ok: {},
  tooManyRequests: {
    description: `\n
    TooManyActionsException:
      Too many actions. Try later`,
  },
  badRequest: {
    description: `\n
    NotRegisteredException:
      User with such email is not registered yet

    InvalidBodyException:
      Email is not an email
      Email cannot be empty`,
  },
};
