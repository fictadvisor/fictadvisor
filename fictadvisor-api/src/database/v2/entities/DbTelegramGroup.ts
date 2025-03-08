import { DbGroup } from './DbGroup';
import { TelegramSource } from '@prisma/client/fictadvisor';

export class DbTelegramGroup {
  group?: DbGroup;
  groupId: string;
  telegramId: bigint;
  threadId?: bigint;
  source: TelegramSource;
  postInfo: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
}
