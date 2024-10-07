import { ApiDocumentationParams } from '../decorators';
import { AuthLoginResponse } from '@fictadvisor/utils';
import { DefaultUnauthorizedResponse } from '../defaultResponses';

export const AuthDocumentationLogin: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: AuthLoginResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Token cannot be empty
      Password cannot be empty
      
    InvalidEntityIdException  
      User with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
};
