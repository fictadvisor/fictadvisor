import { ApiProperty } from '@nestjs/swagger';
import { TelegramSource } from '@prisma/client';

export class TelegramGroupResponse {
  @ApiProperty()
    groupId: string;

  @ApiProperty()
    telegramId: bigint;

  @ApiProperty({
    enum: TelegramSource,
  })
    source: TelegramSource;
}

export class TelegramGroupsResponse {
  @ApiProperty({
    type: [TelegramGroupResponse],
  })
    telegramGroups: TelegramGroupResponse[];
}