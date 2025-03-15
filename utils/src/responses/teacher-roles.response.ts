import { ApiProperty } from '@nestjs/swagger';
import { DisciplineTypeEnum } from '../enums';

export class TeacherRolesResponse {
  @ApiProperty({
    description: 'List of teacher discipline types',
    type: [DisciplineTypeEnum],
    enum: DisciplineTypeEnum,
  })
    disciplineTypes: DisciplineTypeEnum[];
}
