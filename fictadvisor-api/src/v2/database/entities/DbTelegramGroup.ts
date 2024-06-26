import { TelegramSource } from '@fictadvisor/utils/enums';
import { DbGroup } from './DbGroup';

export class DbTelegramGroup {
  groupId: string;
  telegramId: bigint;
  threadId?: bigint;
  source: TelegramSource;
  postInfo: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  group: DbGroup;
}