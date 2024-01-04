import { ApiProperty } from '@nestjs/swagger';
import { DisciplineTypeEnum } from '@prisma/client';

export class DisciplineTypeResponse {
  @ApiProperty({
    description: 'Discipline type id',
  })
    id: string;
  @ApiProperty({
    description: 'Discipline\'s id',
  })
    disciplineId: string;
  @ApiProperty({
    enum: DisciplineTypeEnum,
    description: 'Discipline type',
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