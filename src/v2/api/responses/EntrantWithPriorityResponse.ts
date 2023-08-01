import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EducationProgram, PriorityState } from '@prisma/client';
import { EntrantResponse } from './EntrantResponse';

class Priorities {
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