import { ApiProperty } from '@nestjs/swagger';
import { TeacherResponse } from './teacher.response';
import { CathedraResponse } from './cathedra.response';
import { DisciplineTypeEnum } from '../enums';

export class TeacherWithRolesAndCathedrasResponse extends TeacherResponse {
  @ApiProperty({
    type: [DisciplineTypeEnum],
    enum: DisciplineTypeEnum,
    description: 'List of teacher\'s discipline types',
  })
    disciplineTypes: DisciplineTypeEnum[];

  @ApiProperty({
    description: 'Array of teacher cathedras',
    type: [CathedraResponse],
  })
    cathedras: CathedraResponse[];
}
