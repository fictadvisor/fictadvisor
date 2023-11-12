import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TelegramSource } from '@prisma/client';

export class TelegramGroupResponse {
  @ApiProperty({
    description: 'Group id',
  })
    groupId: string;

  @ApiProperty({
    description: 'Telegram chat id',
  })
    telegramId: bigint;

  @ApiPropertyOptional({
    description: 'Thread id',
  })
    threadId?: bigint;

  @ApiProperty({
    enum: TelegramSource,
    description: 'Type of telegram chat',
  })
    source: TelegramSource;

  @ApiProperty({
    description: 'Whether to write messages about classes ',
  })
    postInfo: boolean;
}

export class TelegramGroupsResponse {
  @ApiProperty({
    type: [TelegramGroupResponse],
  })
    telegramGroups: TelegramGroupResponse[];
}