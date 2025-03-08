import { ApiProperty } from '@nestjs/swagger';
import { EventTypeEnum } from '../enums';
import { AutoMap } from '@automapper/classes';

export class BaseShortEventResponse {
  @ApiProperty({
    description: 'Event\'s id',
  })
  @AutoMap()
    id: string;

  @ApiProperty({
    description: 'Event\'s name',
  })
  @AutoMap()
    name: string;

  @ApiProperty({
    description: 'Start time of event',
  })
  @AutoMap()
    startTime: Date;

  @ApiProperty({
    description: 'End time of event',
  })
  @AutoMap()
    endTime: Date;
}

export class ShortEventResponse extends BaseShortEventResponse {
  @ApiProperty({
    enum: EventTypeEnum,
    description: 'Type of event',
  })
  @AutoMap(() => String)
    eventType: EventTypeEnum;
}

export class GeneralShortEventResponse extends BaseShortEventResponse {
  @ApiProperty({
    enum: [EventTypeEnum.LECTURE, EventTypeEnum.PRACTICE, EventTypeEnum.LABORATORY],
    description: 'General event type',
  })
  @AutoMap(() => String)
    eventType: EventTypeEnum;
}

export class TelegramShortEventResponse extends ShortEventResponse {
  @ApiProperty({
    description: 'Event\'s url',
  })
  @AutoMap()
    url: string;

  @ApiProperty({
    description: 'Description of the event',
  })
  @AutoMap()
    eventInfo: string;
}
