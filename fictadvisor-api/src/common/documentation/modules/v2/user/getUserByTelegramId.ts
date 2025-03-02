import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { OrdinaryStudentResponse } from '@fictadvisor/utils';
import { DefaultUnauthorizedResponse } from '../../../defaultResponses';

export const UserDocumentationGetUserByTelegramId: ApiDocumentationParams = {
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
      name: 'telegramId',
      type: Number,
    },
  ],
};
