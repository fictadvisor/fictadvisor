import { ApiProperty } from '@nestjs/swagger';
import { GeneralEventInfoResponse, MainEventInfoResponse } from './MainEventInfoResponse';
import { TelegramGeneralEventInfoResponse } from './TelegramGeneralEventInfoResponse';

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

export class TelegramGeneralEventsResponse {
  @ApiProperty({
    type: [TelegramGeneralEventInfoResponse],
  })
    events: TelegramGeneralEventInfoResponse[];
}

export class FortnightGeneralEventsResponse {
  @ApiProperty({
    type: [TelegramGeneralEventInfoResponse],
  })
    firstWeekEvents: TelegramGeneralEventInfoResponse[];

  @ApiProperty({
    type: [TelegramGeneralEventInfoResponse],
  })
    secondWeekEvents: TelegramGeneralEventInfoResponse[];
}