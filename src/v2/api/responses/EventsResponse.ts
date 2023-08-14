import { ApiProperty } from '@nestjs/swagger';
import { MainEventInfoResponse } from './MainEventInfoResponse';

export class EventsResponse {
  @ApiProperty({
    minimum: 1,
  })
    week: number;

  @ApiProperty({
    type: [MainEventInfoResponse],
  })
    events: MainEventInfoResponse[];

  @ApiProperty()
    startTime: Date;
}
