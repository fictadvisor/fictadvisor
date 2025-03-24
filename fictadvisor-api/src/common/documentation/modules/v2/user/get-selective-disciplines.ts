import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DisciplineIdsResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses.constants';

export const UserDocumentationGetSelectiveDisciplines: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: DisciplineIdsResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      User with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [
    {
      name: 'userId',
      required: true,
      description: 'Id of a user',
    },
  ],
};
