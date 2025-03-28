import { ApiProperty } from '@nestjs/swagger';
import { GroupResponse } from './group.response';
import { TelegramSource } from '../enums/db/telegram-source.enum';

export class TelegramGroupByTelegramIdResponse {
  @ApiProperty({
    enum: TelegramSource,
    description: 'Type of telegram chat',
  })
    source: TelegramSource;

  @ApiProperty({
    type: GroupResponse,
    description: 'List of group\'s data',
  })
    group: GroupResponse;

  @ApiProperty({
    description: 'Thread id',
  })
    threadId: bigint;

  @ApiProperty({
    description: 'Whether to write messages about classes',
  })
    postInfo: boolean;
}

export class TelegramGroupsByTelegramIdResponse {
  @ApiProperty({
    type: [TelegramGroupByTelegramIdResponse],
  })
    telegramGroups: TelegramGroupByTelegramIdResponse[];
}
