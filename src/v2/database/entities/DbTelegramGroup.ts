import { Group, TelegramSource } from '@prisma/client';

export class DbTelegramGroup {
  groupId: string;
  telegramId: bigint;
  threadId?: bigint;
  source: TelegramSource;
  group: Group;
}