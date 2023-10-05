import { ApiProperty } from '@nestjs/swagger';
import { TelegramSource } from '@prisma/client';

export class TelegramGroups {
  @ApiProperty()
    telegramId: bigint;

  @ApiProperty()
    threadId: bigint;

  @ApiProperty()
    postInfo: boolean;

  @ApiProperty({
    enum: TelegramSource,
  })
    source: TelegramSource;
}

export class GroupWithTelegramGroupsResponse {
  @ApiProperty()
    id: string;

  @ApiProperty({
    type: TelegramGroups,
  })
    telegramGroups: TelegramGroups;
}

export class GroupsWithTelegramGroupsResponse {
  @ApiProperty({
    type: [GroupWithTelegramGroupsResponse],
  })
    groups: GroupWithTelegramGroupsResponse[];
}
