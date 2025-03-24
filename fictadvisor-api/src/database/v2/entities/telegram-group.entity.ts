import { DbGroup } from './group.entity';
import { TelegramSource } from '@prisma/client/fictadvisor';

export class DbTelegramGroup {
  group?: DbGroup;
  groupId: string;
  telegramId: bigint;
  threadId: bigint | null;
  source: TelegramSource;
  postInfo: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
}
