import { Injectable } from '@nestjs/common';
import { DbTelegramGroup } from '../../database/v2/entities/DbTelegramGroup';
import {
  TelegramGroupResponse,
  TelegramGroupsByTelegramIdResponse,
  TelegramGroupsResponse,
} from '@fictadvisor/utils/responses';

@Injectable()
export class TelegramGroupMapper {
  getTelegramGroup ({ groupId, telegramId, source, threadId, postInfo }: DbTelegramGroup) : TelegramGroupResponse  {
    return {
      groupId,
      telegramId,
      source,
      threadId,
      postInfo,
    };
  }

  getTelegramGroups (telegramGroups: DbTelegramGroup[]) : TelegramGroupsResponse {
    return {
      telegramGroups: telegramGroups.map((telegramGroup) => this.getTelegramGroup(telegramGroup)),
    };
  }

  getTelegramGroupsByTelegramId (telegramGroups: DbTelegramGroup[]): TelegramGroupsByTelegramIdResponse { 
    return {
      telegramGroups: telegramGroups.map((telegramGroup) => ({
        source: telegramGroup.source,
        group: {
          id: telegramGroup.groupId,
          code: telegramGroup.group.code,
        },
        threadId: telegramGroup.threadId,
        postInfo: telegramGroup.postInfo,
      })),
    };
  }
}
