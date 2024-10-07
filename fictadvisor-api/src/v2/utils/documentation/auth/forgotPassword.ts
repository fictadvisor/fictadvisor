import { ApiDocumentationParams } from '../decorators';

export const AuthDocumentationForgotPassword: ApiDocumentationParams = {
  ok: {},
  badRequest: {
    description: `\n
    NotRegisteredException:
      User with such email is not registered yet
    
    InvalidBodyException:
      Email is not an email
      Email cannot be empty`,
  },
  tooManyRequests: {
    description: `\n
    TooManyActionsException:
      Too many actions. Try later`,
  },
};
