import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { GroupsWithTelegramGroupsResponse } from '@fictadvisor/utils';
import { DefaultUnauthorizedResponse } from '../../../default-responses.constants';

export const GroupDocumentationGetGroupsWithTelegramGroups: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: GroupsWithTelegramGroupsResponse,
  },
  unauthorized: DefaultUnauthorizedResponse,
};
