import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses.constants';

export const UserDocumentationDeleteUser: ApiDocumentationParams = {
  isAuth: true,
  ok: {},
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
