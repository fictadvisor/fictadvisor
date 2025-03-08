import { ApiProperty } from '@nestjs/swagger';
import { TelegramSource } from '../enums';
import { AutoMap } from '@automapper/classes';

export class TelegramGroups {
  @ApiProperty({
    description: 'Telegram id of the group',
  })
  @AutoMap()
    telegramId: bigint;

  @ApiProperty({
    description: 'Thread id of the group',
  })
  @AutoMap()
    threadId: bigint;

  @ApiProperty({
    description: 'Whether to write messages about classes only there',
  })
  @AutoMap()
    postInfo: boolean;

  @ApiProperty({
    description: 'Type of telegram group',
    enum: TelegramSource,
  })
  @AutoMap(() => String)
    source: TelegramSource;
}

export class GroupWithTelegramGroupsResponse {
  @ApiProperty({
    description: 'Group id',
  })
  @AutoMap()
    id: string;

  @ApiProperty({
    description: 'Telegram groups that are connected with group',
    type: [TelegramGroups],
  })
  @AutoMap(() => [TelegramGroups])
    telegramGroups: TelegramGroups[];
}

export class GroupsWithTelegramGroupsResponse {
  @ApiProperty({
    description: 'Group with connected telegram groups',
    type: [GroupWithTelegramGroupsResponse],
  })
    groups: GroupWithTelegramGroupsResponse[];
}
