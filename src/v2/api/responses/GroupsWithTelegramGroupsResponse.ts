import { ApiProperty } from '@nestjs/swagger';
import { TelegramSource } from '@prisma/client';

export class TelegramGroups {
  @ApiProperty({
    description: 'Telegram id of the group',
  })
    telegramId: bigint;

  @ApiProperty({
    description: 'Thread id of the group',
  })
    threadId: bigint;

  @ApiProperty({
    description: 'Whether to write messages about classes only there',
  })
    postInfo: boolean;

  @ApiProperty({
    description: 'Type of telegram group',
    enum: TelegramSource,
  })
    source: TelegramSource;
}

export class GroupWithTelegramGroupsResponse {
  @ApiProperty({
    description: 'Group id',
  })
    id: string;

  @ApiProperty({
    description: 'Telegram groups that are connected with group',
    type: TelegramGroups,
  })
    telegramGroups: TelegramGroups;
}

export class GroupsWithTelegramGroupsResponse {
  @ApiProperty({
    description: 'Group with connected telegram groups',
    type: [GroupWithTelegramGroupsResponse],
  })
    groups: GroupWithTelegramGroupsResponse[];
}
