import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses';

export const UserDocumentationRemoveRole: ApiDocumentationParams = {
  isAuth: true,
  ok: {},
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      User with such id is not found
      Role with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [
    {
      name: 'userId',
      required: true,
      description: 'Id of a user',
    },
    {
      name: 'roleId',
      required: true,
      description: 'Id of a user role',
    },
  ],
};
