import { ApiProperty } from '@nestjs/swagger';
import { DisciplineTypeEnum } from '@prisma/client';

export class GeneralEventResponse {
  @ApiProperty()
    id: string;

  @ApiProperty()
    name: string;

  @ApiProperty()
    startTime: Date;

  @ApiProperty()
    endTime: Date;

  @ApiProperty({
    enum: [DisciplineTypeEnum.LECTURE, DisciplineTypeEnum.PRACTICE, DisciplineTypeEnum.LABORATORY],
  })
    disciplineType: DisciplineTypeEnum;
}