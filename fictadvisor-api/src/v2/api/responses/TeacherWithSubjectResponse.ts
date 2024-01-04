import { ApiProperty } from '@nestjs/swagger';
import { SubjectResponse } from './SubjectResponse';
import { TeacherRole } from '@prisma/client';
import { ContactResponse } from './ContactResponse';
import { TeacherResponse } from './TeacherResponse';

export class TeacherWithSubjectResponse extends TeacherResponse {
  @ApiProperty()
    subject: SubjectResponse;

  @ApiProperty({
    type: Set<TeacherRole>,
    enum: TeacherRole,
  })
    roles: Set<TeacherRole>;

  @ApiProperty({
    type: [ContactResponse],
  })
    contacts: ContactResponse[];
}