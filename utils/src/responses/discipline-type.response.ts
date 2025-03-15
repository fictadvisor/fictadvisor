import { ApiProperty } from '@nestjs/swagger';
import { DisciplineTypeEnum } from '../enums';

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
