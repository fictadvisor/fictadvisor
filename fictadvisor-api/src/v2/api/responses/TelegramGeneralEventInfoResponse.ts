import { ApiProperty } from '@nestjs/swagger';
import { MainEventInfoResponse, SimpleEventInfoResponse } from './MainEventInfoResponse';
export class TelegramEventInfoResponse extends MainEventInfoResponse {
  @ApiProperty({
    description: 'Event\'s url',
  })
    url: string;
  
  @ApiProperty({
    description: 'Description of the event',
  })
    eventInfo: string;
}

export class SimpleTelegramEventInfoResponse extends SimpleEventInfoResponse {
  @ApiProperty({
    description: 'Event\'s url',
  })
    url: string;
  
  @ApiProperty({
    description: 'Description of the event',
  })
    eventInfo: string;
}