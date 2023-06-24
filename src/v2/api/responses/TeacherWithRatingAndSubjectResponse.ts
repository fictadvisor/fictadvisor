import { ApiProperty } from '@nestjs/swagger';
import { SubjectResponse } from './SubjectResponse';
import { TeacherRole } from '@prisma/client';
import { ContactResponse } from './ContactResponse';
import { TeacherWithRatingResponse } from './TeacherWithRatingResponse';

export class TeacherWithRatingAndSubjectResponse extends TeacherWithRatingResponse {
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