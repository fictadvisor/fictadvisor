import { ApiProperty } from '@nestjs/swagger';
import { TeacherResponse } from './TeacherResponse';
import { TeacherRole } from '@prisma/client';

export class DisciplineTeacherResponse extends TeacherResponse {
  @ApiProperty()
    disciplineTeacherId: string;
  @ApiProperty({
    type: [TeacherRole],
    enum: TeacherRole,
  })
    roles: TeacherRole[];
}
