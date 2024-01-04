import { ApiProperty } from '@nestjs/swagger';
import { TelegramSource } from '@prisma/client';
import { GroupResponse } from './GroupResponse';

export class TelegramGroupByTelegramIdResponse {
  @ApiProperty({
    enum: TelegramSource,
  })
    source: TelegramSource;

  @ApiProperty({
    type: GroupResponse,
  })
    group: GroupResponse;

  @ApiProperty()
    threadId: bigint;

  @ApiProperty()
    postInfo: boolean;
}

export class TelegramGroupsByTelegramIdResponse {
  @ApiProperty({
    type: [TelegramGroupByTelegramIdResponse],
  })
    telegramGroups: TelegramGroupByTelegramIdResponse[];
}