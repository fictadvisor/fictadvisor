import { ApiDocumentationParams } from '../decorators';
import { SuperheroResponse } from '@fictadvisor/utils';
import { DefaultUnauthorizedResponse } from '../defaultResponses';

export const UserDocumentationVerifySuperhero: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: SuperheroResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      User with such id is not found

    InvalidBodyException:
      State must be an enum
      Dorm must be a boolean`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultUnauthorizedResponse,
  params: [
    {
      name: 'userId',
      required: true,
      description: 'Id of a superhero to verify',
    },
  ],
};
