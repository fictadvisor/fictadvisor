import { ApiProperty } from '@nestjs/swagger';
import { Period } from '@prisma/client';
import { EventTypeEnum } from '../dtos/EventTypeEnum';

export class TeacherNamesResponse {
  @ApiProperty()
    id: string;

  @ApiProperty()
    firstName: string;

  @ApiProperty()
    middleName: string;

  @ApiProperty()
    lastName: string;
}

export class EventResponse {
  @ApiProperty()
    id: string;

  @ApiProperty()
    name: string;

  @ApiProperty()
    disciplineId: string;

  @ApiProperty({
    enum: EventTypeEnum,
  })
    eventType: EventTypeEnum;

  @ApiProperty()
    startTime: Date;

  @ApiProperty()
    endTime: Date;

  @ApiProperty({
    enum: Period,
  })
    period: Period;

  @ApiProperty()
    url: string;

  @ApiProperty()
    eventInfo: string;

  @ApiProperty()
    disciplineInfo: string;

  @ApiProperty({
    type: [TeacherNamesResponse],
  })
    teachers: TeacherNamesResponse[];
}