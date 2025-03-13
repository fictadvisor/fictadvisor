import { DbGroup } from './DbGroup';
import { TelegramSource } from '@prisma/client/fictadvisor';
import { AutoMap } from '@automapper/classes';

export class DbTelegramGroup {
  @AutoMap(() => DbGroup)
    group?: DbGroup;

  @AutoMap()
    groupId: string;

  @AutoMap()
    telegramId: bigint;

  @AutoMap()
    threadId?: bigint;

  @AutoMap(() => String)
    source: TelegramSource;

  @AutoMap()
    postInfo: boolean;

  createdAt: Date | null;
  updatedAt: Date | null;
}
