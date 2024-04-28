import { ApiProperty } from '@nestjs/swagger';
import { TeacherResponse } from './TeacherResponse';
import { CathedraResponse } from './CathedraResponse';
import { TeacherRole } from '../enums/db/TeacherRoleEnum';

export class TeacherWithRolesAndCathedrasResponse extends TeacherResponse {
  @ApiProperty({
    type: [TeacherRole],
    enum: TeacherRole,
    description: 'List of teacher\'s roles',
  })
    roles: TeacherRole[];

  @ApiProperty({
    description: 'Array of teacher cathedras',
    type: [CathedraResponse],
  })
    cathedras: CathedraResponse[];
}