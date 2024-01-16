import { ApiProperty } from '@nestjs/swagger';
import { TeacherRole } from '@prisma/client';
import { TeacherResponse } from './TeacherResponse';
import { CathedraResponse } from './CathedraResponse';

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