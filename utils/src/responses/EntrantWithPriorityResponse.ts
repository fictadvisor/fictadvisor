import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EntrantResponse } from './EntrantResponse';
import { EducationProgram } from '../enums/db/EducationProgramEnum';
import { PriorityState } from '../enums/db/PriorityStateEnum';

export class Priorities {
  @ApiProperty({
    enum: EducationProgram,
  })
    1: EducationProgram;

  @ApiProperty({
    enum: EducationProgram,
  })
    2: EducationProgram;

  @ApiPropertyOptional({
    enum: EducationProgram,
  })
    3?: EducationProgram;
}

export class EntrantWithPriorityResponse extends EntrantResponse {
  @ApiProperty({
    enum: PriorityState,
  })
    state: PriorityState;

  @ApiProperty()
    date: string;

  @ApiProperty({
    type: Priorities,
  })
    priorities: Priorities;
}