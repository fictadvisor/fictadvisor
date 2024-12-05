import { ApiDocumentationParams } from '../decorators';
import { TelegramGroupResponse } from '@fictadvisor/utils/responses';
import { DefaultUnauthorizedResponse } from '../defaultResponses';

export const TelegramGroupDocumentationCreate : ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: TelegramGroupResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      TelegramId can not be empty
      TelegramId must be a number
      Source can not be empty
      Source must be an enum
      ThreadId must be a number
      PostInfo can not be empty
      PostInfo must be a boolean
      
    ObjectIsRequiredException:
      Thread ID is required
      
    AlreadyExistException:
      TelegramGroup already exist
      
    InvalidEntityIdException:
      Group with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  params: [
    {
      name: 'groupId',
      type: 'string',
      required: true,
      description: 'University group id to which to add telegram group',
    },
  ],
};
