import { ApiDocumentationParams } from 'src/v2/utils/documentation/decorators';
import { DefaultUnauthorizedResponse } from '../defaultResponses';
import { TelegramGroupsResponse } from '@fictadvisor/utils';

export const TelegramGroupDocumentationGetAll: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: TelegramGroupsResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Group with such id is not found
      
    DataNotFoundException:
      Data were not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
};
