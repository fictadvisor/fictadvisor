import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { GroupsWithTelegramGroupsResponse } from '@fictadvisor/utils';
import { DefaultUnauthorizedResponse } from '../../../default-responses';

export const GroupDocumentationGetGroupsWithTelegramGroups: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: GroupsWithTelegramGroupsResponse,
  },
  unauthorized: DefaultUnauthorizedResponse,
};
