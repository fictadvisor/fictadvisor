import { ApiProperty } from '@nestjs/swagger';
import { MainEventInfoResponse } from './MainEventInfoResponse';
export class TelegramEventInfoResponse extends MainEventInfoResponse {
  @ApiProperty({
    description: 'Event\'s url',
  })
    url: string;
}