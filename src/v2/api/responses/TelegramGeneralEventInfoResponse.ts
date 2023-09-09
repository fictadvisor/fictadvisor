import { ApiProperty } from '@nestjs/swagger';
import { GeneralEventInfoResponse } from './MainEventInfoResponse';

export class TelegramGeneralEventInfoResponse extends GeneralEventInfoResponse {
  @ApiProperty()
    url: string;
}