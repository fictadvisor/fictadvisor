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
}

export class TelegramGroupsByTelegramIdResponse {
  @ApiProperty({
    type: [TelegramGroupByTelegramIdResponse],
  })
    telegramGroups: TelegramGroupByTelegramIdResponse[];
}