import { Injectable } from '@nestjs/common';
import { DbTelegramGroup } from '../database/entities/DbTelegramGroup';

@Injectable()
export class TelegramGroupMapper {
  getTelegramGroup ({ groupId, telegramId, source, threadId, postInfo }: DbTelegramGroup) {
    return {
      groupId,
      telegramId,
      source,
      threadId,
      postInfo,
    };
  }

  getTelegramGroups (telegramGroups: DbTelegramGroup[]) {
    return {
      telegramGroups: telegramGroups.map((telegramGroup) => this.getTelegramGroup(telegramGroup)),
    };
  }

  getGroupsByTelegramId (telegramGroups: DbTelegramGroup[]) {
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