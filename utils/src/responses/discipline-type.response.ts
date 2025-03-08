import { ApiProperty } from '@nestjs/swagger';
import { DisciplineTypeEnum } from '../enums';
import { AutoMap } from '@automapper/classes';

export class DisciplineTypeResponse {
  @ApiProperty({
    description: 'Discipline type id',
  })
  @AutoMap()
    id: string;

  @ApiProperty({
    description: 'Discipline\'s id',
  })
  @AutoMap()
    disciplineId: string;

  @ApiProperty({
    enum: DisciplineTypeEnum,
    description: 'Discipline type',
  })
  @AutoMap(() => String)
    name: DisciplineTypeEnum;
}
