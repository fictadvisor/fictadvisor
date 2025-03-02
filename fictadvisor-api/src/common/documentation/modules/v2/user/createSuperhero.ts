import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { SuperheroResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../defaultResponses';

export const UserDocumentationCreateSuperhero: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: SuperheroResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      User with such id is not found

    InvalidBodyException:
      Dorm must be a boolean
      Dorm cannot be empty`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [
    {
      name: 'userId',
      required: true,
      description: 'Id of a user which is going to be a superhero',
    },
  ],
};
