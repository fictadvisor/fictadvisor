import { ApiProperty } from '@nestjs/swagger';
import { DisciplineTypeEnum } from '@prisma/client';

class TeacherNamesResponse {
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

  @ApiProperty({
    enum: DisciplineTypeEnum,
  })
    disciplineType: DisciplineTypeEnum;

  @ApiProperty()
    startTime: Date;

  @ApiProperty()
    endTime: Date;

  @ApiProperty()
    url: string;

  @ApiProperty()
    eventInfo: string;

  @ApiProperty()
    disciplineInfo: string;

  @ApiProperty({
    type: [TeacherNamesResponse],
  })
    teachers: TeacherNamesResponse;
}