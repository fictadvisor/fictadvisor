import { ApiProperty } from '@nestjs/swagger';
import {
  GeneralShortEventResponse,
  ShortEventResponse,
  TelegramShortEventResponse,
} from './short-event.response';

class EventWeekResponse {
  @ApiProperty({
    description: 'Week number',
    minimum: 1,
  })
    week: number;

  @ApiProperty({
    description: 'Week start time',
  })
    startTime: Date;
}

export class WeekEventsResponse extends EventWeekResponse {
  @ApiProperty({
    description: 'List of events',
    type: [ShortEventResponse],
  })
    events: ShortEventResponse[];
}

export class WeekGeneralEventsResponse extends EventWeekResponse {
  @ApiProperty({
    description: 'List of events',
    type: [GeneralShortEventResponse],
  })
    events: GeneralShortEventResponse[];
}

export class EventsResponse {
  @ApiProperty({
    description: 'List of events',
    type: [ShortEventResponse],
  })
    events: ShortEventResponse[];
}

export class TelegramEventsResponse {
  @ApiProperty({
    type: [TelegramShortEventResponse],
    description: 'List of events',
  })
    events: TelegramShortEventResponse[];
}

export class FortnightTelegramEventsResponse {
  @ApiProperty({
    type: [TelegramShortEventResponse],
    description: 'List of events of the first week',
  })
    firstWeekEvents: TelegramShortEventResponse[];

  @ApiProperty({
    type: [TelegramShortEventResponse],
    description: 'List of events of the second week',
  })
    secondWeekEvents: TelegramShortEventResponse[];
}
