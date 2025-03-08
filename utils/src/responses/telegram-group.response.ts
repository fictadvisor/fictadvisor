import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TelegramSource } from '../enums';
import { AutoMap } from '@automapper/classes';

export class TelegramGroupResponse {
  @ApiProperty({
    description: 'Group id',
  })
  @AutoMap()
    groupId: string;

  @ApiProperty({
    description: 'Telegram chat id',
  })
  @AutoMap()
    telegramId: bigint;

  @ApiPropertyOptional({
    description: 'Thread id',
  })
  @AutoMap()
    threadId?: bigint;

  @ApiProperty({
    enum: TelegramSource,
    description: 'Type of telegram chat',
  })
  @AutoMap(() => String)
    source: TelegramSource;

  @ApiProperty({
    description: 'Whether to write messages about classes ',
  })
  @AutoMap()
    postInfo: boolean;
}

export class TelegramGroupsResponse {
  @ApiProperty({
    type: [TelegramGroupResponse],
  })
    telegramGroups: TelegramGroupResponse[];
}
