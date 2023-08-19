import { ApiProperty } from '@nestjs/swagger';
import { DisciplineTypeResponse, GeneralDisciplineTypeResponse } from './DisciplineTypeResponse';

export class MainEventInfoResponse {
  @ApiProperty()
    id: string;

  @ApiProperty()
    name: string;

  @ApiProperty()
    startTime: Date;

  @ApiProperty()
    endTime: Date;

  @ApiProperty({
    type: DisciplineTypeResponse,
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