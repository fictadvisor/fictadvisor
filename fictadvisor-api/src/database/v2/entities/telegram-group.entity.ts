import { DbBaseGroup } from './group.entity';
import { TelegramSource } from '@prisma-client/fictadvisor';
import { AutoMap } from '@automapper/classes';

export class DbBaseTelegramGroup {
  @AutoMap()
    groupId: string;

  @AutoMap()
    telegramId: bigint;

  // The token only keeps `emitDecoratorMetadata` from collapsing the union to
  // `Object`, which automapper silently skips; the bigint passes through as is.
  @AutoMap(() => Number)
    threadId: bigint | null;

  @AutoMap(() => String)
    source: TelegramSource;

  @AutoMap()
    postInfo: boolean;

  createdAt: Date | null;
  updatedAt: Date | null;
}

/** TelegramGroupRepository: `group: true` */
export class DbTelegramGroup extends DbBaseTelegramGroup {
  @AutoMap(() => DbBaseGroup)
    group: DbBaseGroup;
}
