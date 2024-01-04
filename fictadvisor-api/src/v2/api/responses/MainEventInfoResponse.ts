import { ApiProperty } from '@nestjs/swagger';
import { DisciplineTypeResponse, GeneralDisciplineTypeResponse } from './DisciplineTypeResponse';

export class MainEventInfoResponse {
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

  @ApiProperty({
    type: DisciplineTypeResponse,
    description: 'Type of event',
  })
    disciplineType: DisciplineTypeResponse;
}

export class GeneralEventInfoResponse {
  @ApiProperty()
    id: string;

  @ApiProperty()
    name: string;

  @ApiProperty()
    startTime: Date;

  @ApiProperty()
    endTime: Date;

  @ApiProperty({
    type: GeneralDisciplineTypeResponse,
  })
    disciplineType: GeneralDisciplineTypeResponse;
}