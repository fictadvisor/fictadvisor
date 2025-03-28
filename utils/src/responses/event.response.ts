import { ApiProperty } from '@nestjs/swagger';
import { Period } from '../enums/db/period.enum';
import { EventTypeEnum } from '../enums/other/event-type.enum';

export class TeacherNameResponse {
  @ApiProperty({
    description: 'Teacher id',
  })
    id: string;

  @ApiProperty({
    description: 'Teacher\'s name',
  })
    firstName: string;

  @ApiProperty({
    description: 'Teacher\'s middle name',
  })
    middleName: string;

  @ApiProperty({
    description: 'Teacher\'s last name',
  })
    lastName: string;
}

export class EventResponse {
  @ApiProperty({
    description: 'Event ID',
  })
    id: string;

  @ApiProperty({
    description: 'Event name',
  })
    name: string;

  @ApiProperty({
    description: 'Id of the discipline associated with the event',
  })
    disciplineId: string;

  @ApiProperty({
    enum: EventTypeEnum,
    description: 'Event discipline type',
  })
    eventType: EventTypeEnum;

  @ApiProperty({
    description: 'Event start time',
  })
    startTime: Date;

  @ApiProperty({
    description: 'Event end time',
  })
    endTime: Date;

  @ApiProperty({
    enum: Period,
    description: 'The period during which the event occurs',
  })
    period: Period;

  @ApiProperty({
    description: 'The URL associated with the event',
  })
    url: string;

  @ApiProperty({
    description: 'Event information',
  })
    eventInfo: string;

  @ApiProperty({
    description: 'Information about the discipline',
  })
    disciplineInfo: string;

  @ApiProperty({
    type: [TeacherNameResponse],
    description: 'An array of teachers linked to the event',
  })
    teachers: TeacherNameResponse[];
}
