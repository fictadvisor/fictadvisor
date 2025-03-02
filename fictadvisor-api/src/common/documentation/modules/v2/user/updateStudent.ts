import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { FullStudentResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../defaultResponses';

export const UserDocumentationUpdateStudent: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: FullStudentResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      User with such id is not found
      
    InvalidBodyException:
      First name is not correct (A-Я(укр.)\\-' )
      First name is too short (min 2)
      First name is too long (max 40)
      Last name is not correct (A-Я(укр.)\\-' )
      Last name is too short (min 2)
      Last name is too long (max 40)
      Middle name is not correct (A-Я(укр.)\\-' )
      Middle name is too long (max 40)
      Role name must be an enum
      Group id must be an UUID`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [
    {
      name: 'userId',
      required: true,
      description: 'Id of a user to update',
    },
  ],
};
