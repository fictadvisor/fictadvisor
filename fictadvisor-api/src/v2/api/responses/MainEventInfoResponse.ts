import { ApiProperty } from '@nestjs/swagger';
import { DisciplineTypeResponse, GeneralDisciplineTypeResponse } from './DisciplineTypeResponse';

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
    type: DisciplineTypeResponse,
    description: 'Type of event',
  })
    disciplineType: DisciplineTypeResponse;
}

export class GeneralEventInfoResponse extends SimpleEventInfoResponse {
  @ApiProperty({
    type: GeneralDisciplineTypeResponse,
  })
    disciplineType: GeneralDisciplineTypeResponse;
}