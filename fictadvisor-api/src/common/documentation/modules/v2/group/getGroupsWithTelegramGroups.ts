import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { GroupsWithTelegramGroupsResponse } from '@fictadvisor/utils';
import { DefaultUnauthorizedResponse } from '../../../defaultResponses';

export const GroupDocumentationGetGroupsWithTelegramGroups: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: GroupsWithTelegramGroupsResponse,
  },
  unauthorized: DefaultUnauthorizedResponse,
};
