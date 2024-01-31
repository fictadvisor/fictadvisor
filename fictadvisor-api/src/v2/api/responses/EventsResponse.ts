import { ApiProperty } from '@nestjs/swagger';
import { GeneralEventInfoResponse, MainEventInfoResponse } from './MainEventInfoResponse';
import { TelegramEventInfoResponse } from './TelegramGeneralEventInfoResponse';

export class EventsResponse {
  @ApiProperty({
    description: 'Week number',
    minimum: 1,
  })
    week: number;

  @ApiProperty({
    description: 'List of events',
    type: [MainEventInfoResponse],
  })
    events: MainEventInfoResponse[];

  @ApiProperty({
    description: 'Start time of the event',
  })
    startTime: Date;
}

export class GeneralEventsResponse {
  @ApiProperty({
    description: 'Week number',
    minimum: 1,
  })
    week: number;

  @ApiProperty({
    description: 'List of events',
    type: [GeneralEventInfoResponse],
  })
    events: GeneralEventInfoResponse[];

  @ApiProperty({
    description: 'Start time of the event',
  })
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