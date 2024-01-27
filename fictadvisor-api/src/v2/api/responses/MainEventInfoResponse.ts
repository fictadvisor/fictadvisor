import { ApiProperty } from '@nestjs/swagger';
import { EventTypeEnum } from '../dtos/EventTypeEnum';

export class SimpleEventInfoResponse {
  @ApiProperty({
    description: 'Event\'s id',
  })
    id: string;

  @ApiProperty({
    description: 'Event\'s name',
  })
    name: string;

  @ApiProperty({
    description: 'Start time of event',
  })
    startTime: Date;

  @ApiProperty({
    description: 'End time of event',
  })
    endTime: Date;
}

export class MainEventInfoResponse extends SimpleEventInfoResponse {
  @ApiProperty({
    enum: EventTypeEnum,
    description: 'Type of event',
  })
    eventType: EventTypeEnum;
}

export class GeneralEventInfoResponse extends SimpleEventInfoResponse {
  @ApiProperty({
    enum: [EventTypeEnum.LECTURE, EventTypeEnum.PRACTICE, EventTypeEnum.LABORATORY],
    description: 'General event type',
  })
    eventType: EventTypeEnum;
}