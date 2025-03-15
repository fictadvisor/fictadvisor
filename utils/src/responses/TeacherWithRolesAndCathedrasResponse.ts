import { ApiProperty } from '@nestjs/swagger';
import { TeacherResponse } from './TeacherResponse';
import { CathedraResponse } from './CathedraResponse';
import { DisciplineTypeEnum } from '../enums';
import { AutoMap } from '@automapper/classes';

export class TeacherWithRolesAndCathedrasResponse extends TeacherResponse {
  @ApiProperty({
    type: [DisciplineTypeEnum],
    enum: DisciplineTypeEnum,
    description: 'List of teacher\'s discipline types',
  })
  @AutoMap(() => [String])
    disciplineTypes: DisciplineTypeEnum[];

  @ApiProperty({
    description: 'Array of teacher cathedras',
    type: [CathedraResponse],
  })
  @AutoMap(() => [CathedraResponse])
    cathedras: CathedraResponse[];
}
