import { ApiProperty } from '@nestjs/swagger';
import { GeneralEventInfoResponse, MainEventInfoResponse } from './MainEventInfoResponse';

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

export class GeneralEventsResponse {
  @ApiProperty({
    minimum: 1,
  })
    week: number;

  @ApiProperty({
    type: [GeneralEventInfoResponse],
  })
    events: GeneralEventInfoResponse[];

  @ApiProperty()
    startTime: Date;
}