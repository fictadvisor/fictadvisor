import { ApiProperty } from '@nestjs/swagger';
import { Period } from '../enums/db/PeriodEnum';
import { EventTypeEnum } from '../enums/other/EventTypeEnum';

class EventInfo {
  @ApiProperty({
    description: 'The index of the event',
  })
    number: number;

  @ApiProperty({
    description: 'The description of the event',
  })
    eventInfo: string;
}

export class EventInfoResponse {
  @ApiProperty({
    enum: Period,
    description: 'The period during which the event occurs',
  })
    period: Period;

  @ApiProperty({
    description: 'Event start time',
  })
    startTime: Date;

  @ApiProperty({
    description: 'Event end time',
  })
    endTime: Date;

  @ApiProperty({
    description: 'The URL associated with the event',
  })
    url: string;

  @ApiProperty({
    description: 'Event name',
  })
    name: string;

  @ApiProperty({
    enum: EventTypeEnum,
    description: 'Event discipline type',
  })
    type: EventTypeEnum;

  @ApiProperty({
    type: [EventInfo],
    description: 'An array of the information about event',
  })
    eventInfos: EventInfo[];
}