import { TelegramGroupResponse } from '@fictadvisor/utils/responses';
import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { DefaultUnauthorizedResponse } from '../../../defaultResponses';

export const TelegramGroupDocumentationDelete : ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: TelegramGroupResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      TelegramGroup with such id is not found
      Group with such id is not found
      
    DataNotFoundException:
      Data were not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  queries: [
    {
      name: 'telegramId',
      type: Number,
      required: true,
      description: 'Id of telegram group to delete',
    },
    {
      name: 'groupId',
      type: 'string',
      required: true,
      description: 'University group id to which telegram group is connected',
    },
  ],
};
