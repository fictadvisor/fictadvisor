import { ApiProperty } from '@nestjs/swagger';
import { TeacherWithRolesAndCathedrasResponse } from './TeacherWithRolesAndCathedrasResponse';
import { TeacherFullResponse } from './TeacherFullResponse';

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