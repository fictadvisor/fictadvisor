import { ApiDocumentationParams } from '../decorators';
import { OrdinaryStudentResponse } from '@fictadvisor/utils';
import { DefaultUnauthorizedResponse } from '../defaultResponses';

export const UserDocumentationGetUserForTelegram: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: OrdinaryStudentResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      User with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  params: [
    {
      name: 'userId',
      required: true,
      description: 'Id of a user to get',
    },
  ],
};
