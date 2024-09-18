import { ApiDocumentationParams } from '../decorators';
import { SelectivesBySemestersResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const UserDocumentationGetSelectivesBySemesters: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: SelectivesBySemestersResponse,
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
