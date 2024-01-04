import { ApiProperty } from '@nestjs/swagger';
import { TeacherResponse } from './TeacherResponse';
import { TeacherRole } from '@prisma/client';

export class DisciplineTeacherResponse extends TeacherResponse {
  @ApiProperty({
    description: 'Id of specified discipline teacher',
  })
    disciplineTeacherId: string;
  @ApiProperty({
    type: [TeacherRole],
    enum: TeacherRole,
    description: 'The specified teacher roles in discipline',
  })
    roles: TeacherRole[];
}
