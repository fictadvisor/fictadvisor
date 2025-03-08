import { ApiProperty } from '@nestjs/swagger';
import { GroupResponse } from './group.response';
import { TelegramSource } from '../enums';
import { AutoMap } from '@automapper/classes';

export class TelegramGroupByTelegramIdResponse {
  @ApiProperty({
    enum: TelegramSource,
    description: 'Type of telegram chat',
  })
  @AutoMap(() => String)
    source: TelegramSource;

  @ApiProperty({
    type: GroupResponse,
    description: 'List of group\'s data',
  })
  @AutoMap(() => GroupResponse)
    group: GroupResponse;

  @ApiProperty({
    description: 'Thread id',
  })
  @AutoMap()
    threadId: bigint;

  @ApiProperty({
    description: 'Whether to write messages about classes',
  })
  @AutoMap()
    postInfo: boolean;
}

export class TelegramGroupsByTelegramIdResponse {
  @ApiProperty({
    type: [TelegramGroupByTelegramIdResponse],
  })
    telegramGroups: TelegramGroupByTelegramIdResponse[];
}
