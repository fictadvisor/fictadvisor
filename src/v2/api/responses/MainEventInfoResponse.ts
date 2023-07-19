import { ApiProperty } from '@nestjs/swagger';
import { DisciplineTypeResponse } from './DisciplineTypeResponse';

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