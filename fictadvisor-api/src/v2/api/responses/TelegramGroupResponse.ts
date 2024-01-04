import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TelegramSource } from '@prisma/client';

export class TelegramGroupResponse {
  @ApiProperty()
    groupId: string;

  @ApiProperty()
    telegramId: bigint;

  @ApiPropertyOptional()
    threadId?: bigint;

  @ApiProperty({
    enum: TelegramSource,
  })
    source: TelegramSource;

  @ApiProperty()
    postInfo: boolean;
}

export class TelegramGroupsResponse {
  @ApiProperty({
    type: [TelegramGroupResponse],
  })
    telegramGroups: TelegramGroupResponse[];
}