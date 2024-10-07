import { ApiProperty } from '@nestjs/swagger';
import { TeacherResponse } from './TeacherResponse';
import { CathedraResponse } from './CathedraResponse';
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
