import { ApiProperty } from '@nestjs/swagger';
import { DisciplineTypeEnum } from '../enums';
import { AutoMap } from '@automapper/classes';

export class TeacherRolesResponse {
  @ApiProperty({
    description: 'List of teacher discipline types',
    type: [DisciplineTypeEnum],
    enum: DisciplineTypeEnum,
  })
  @AutoMap(() => [String])
    disciplineTypes: DisciplineTypeEnum[];
}
