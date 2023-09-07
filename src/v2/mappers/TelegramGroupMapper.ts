import { Injectable } from '@nestjs/common';
import { DbTelegramGroup } from '../database/entities/DbTelegramGroup';

@Injectable()
export class TelegramGroupMapper {
  getTelegramGroup ({ groupId, telegramId, source }: DbTelegramGroup) {
    return {
      groupId,
      telegramId,
      source,
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
        group: telegramGroup.group,
      })),
    };
  }
}