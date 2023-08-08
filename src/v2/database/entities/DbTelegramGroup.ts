import { Group, TelegramSource } from '@prisma/client';

export class DbTelegramGroup {
  groupId: string;
  telegramId: bigint;
  source: TelegramSource;
  group: Group;
}