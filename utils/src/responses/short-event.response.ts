import { ApiProperty } from '@nestjs/swagger';
import { EventTypeEnum } from '../enums/other/event-type.enum';

export class BaseShortEventResponse {
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

export class ShortEventResponse extends BaseShortEventResponse {
  @ApiProperty({
    enum: EventTypeEnum,
    description: 'Type of event',
  })
    eventType: EventTypeEnum;
}

export class GeneralShortEventResponse extends BaseShortEventResponse {
  @ApiProperty({
    enum: [EventTypeEnum.LECTURE, EventTypeEnum.PRACTICE, EventTypeEnum.LABORATORY],
    description: 'General event type',
  })
    eventType: EventTypeEnum;
}

export class TelegramShortEventResponse extends ShortEventResponse {
  @ApiProperty({
    description: 'Event\'s url',
  })
    url: string;

  @ApiProperty({
    description: 'Description of the event',
  })
    eventInfo: string;
}
