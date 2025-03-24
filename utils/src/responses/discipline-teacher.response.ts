import { ApiProperty } from '@nestjs/swagger';
import { TeacherWithRolesAndCathedrasResponse } from './teacher-with-roles-and-cathedras.response';
import { TeacherFullResponse } from './teacher-full.response';

export class DisciplineTeacherResponse extends TeacherWithRolesAndCathedrasResponse {
  @ApiProperty({
    description: 'Id of specified discipline teacher',
  })
    disciplineTeacherId: string;
}

export class DisciplineTeacherFullResponse extends TeacherFullResponse {
  @ApiProperty({
    description: 'Id of specified discipline teacher',
  })
    disciplineTeacherId: string;
}
