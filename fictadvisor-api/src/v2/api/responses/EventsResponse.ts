import { ApiProperty } from '@nestjs/swagger';
import { GeneralEventInfoResponse, MainEventInfoResponse } from './MainEventInfoResponse';
import { TelegramEventInfoResponse } from './TelegramGeneralEventInfoResponse';

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

export class TelegramEventsResponse {
  @ApiProperty({
    type: [TelegramEventInfoResponse],
    description: 'Return all events',
  })
    events: TelegramEventInfoResponse[];
}

export class FortnightEventsResponse {
  @ApiProperty({
    type: [TelegramEventInfoResponse],
    description: 'Return all events of first week',
  })
    firstWeekEvents: TelegramEventInfoResponse[];

  @ApiProperty({
    type: [TelegramEventInfoResponse],
    description: 'Return all events of second week',
  })
    secondWeekEvents: TelegramEventInfoResponse[];
}