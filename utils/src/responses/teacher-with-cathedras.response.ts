import { ApiProperty } from '@nestjs/swagger';
import { CathedraResponse } from './cathedra.response';
import { TeacherWithRolesResponse } from './teacher-with-roles.response';

export class TeacherWithCathedrasResponse extends TeacherWithRolesResponse {
  @ApiProperty({
    description: 'Array of teacher cathedras',
    type: [CathedraResponse],
  })
    cathedras: CathedraResponse[];
}
