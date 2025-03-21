import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { AuthLoginResponse, LoginDTO } from '@fictadvisor/utils';
import { DefaultUnauthorizedResponse } from '../../../default-responses.constants';

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
  body: {
    type: LoginDTO,
  },
};
