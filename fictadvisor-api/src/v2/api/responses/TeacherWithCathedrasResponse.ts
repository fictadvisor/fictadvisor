import { ApiProperty } from '@nestjs/swagger';
import { CathedraResponse } from './CathedraResponse';
import { TeacherWithRolesResponse } from './TeacherWithRolesResponse';

export class TeacherWithCathedrasResponse extends TeacherWithRolesResponse {
  @ApiProperty({
    description: 'Array of teacher cathedras',
    type: [CathedraResponse],
  })
    cathedras: CathedraResponse[];
}