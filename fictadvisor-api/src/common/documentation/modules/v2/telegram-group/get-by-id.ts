import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { TelegramGroupsByTelegramIdResponse } from '@fictadvisor/utils/responses';
import { DefaultUnauthorizedResponse } from '../../../default-responses.constants';

export const TelegramGroupDocumentationGetById: ApiDocumentationParams = { 
  isAuth: true,
  ok: {
    type: TelegramGroupsByTelegramIdResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      TelegramGroup with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  params: [
    {
      name: 'telegramId',
      type: Number,
      required: true,
      description: 'Id of the telegram group to get information',
    },
  ],
};
