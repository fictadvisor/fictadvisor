import { ApiProperty } from '@nestjs/swagger';
import { DisciplineTypeEnum } from '@prisma/client';

export class DisciplineTypeResponse {
  @ApiProperty()
    id: string;
  @ApiProperty()
    disciplineId: string;
  @ApiProperty({
    enum: DisciplineTypeEnum,
  })
    name: DisciplineTypeEnum;
}

export class GeneralDisciplineTypeResponse {
  @ApiProperty()
    id: string;
  @ApiProperty()
    disciplineId: string;
  @ApiProperty({
    enum: [DisciplineTypeEnum.LECTURE, DisciplineTypeEnum.PRACTICE, DisciplineTypeEnum.LABORATORY],
  })
    name: DisciplineTypeEnum;
}