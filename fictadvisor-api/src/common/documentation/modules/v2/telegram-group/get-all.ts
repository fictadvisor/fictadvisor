import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DefaultUnauthorizedResponse } from '../../../default-responses.constants';
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
