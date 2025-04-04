import { ApiProperty } from '@nestjs/swagger';
import { TeacherResponse } from './teacher.response';
import { DisciplineTypeEnum } from '../enums';

export class TeacherWithRolesResponse extends TeacherResponse {
  @ApiProperty({
    type: [DisciplineTypeEnum],
    enum: DisciplineTypeEnum,
    description: 'List of teacher\'s discipline types',
  })
    disciplineTypes: DisciplineTypeEnum[];
}
