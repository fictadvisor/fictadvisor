import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { TelegramGroupResponse } from '@fictadvisor/utils/responses';
import { DefaultUnauthorizedResponse } from '../../../default-responses.constants';

export const TelegramGroupDocumentationUpdate : ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: TelegramGroupResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      TelegramId must be a number
      Source must be an enum
      ThreadId must be a number
      PostInfo must be a boolean
    
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
      description: 'Id of telegram group to update',
    },
    {
      name: 'groupId',
      type: 'string',
      required: true,
      description: 'University group id to which telegram group is connected',
    },
  ],
};
