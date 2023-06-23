import { ApiProperty } from '@nestjs/swagger';
import { TeacherWithRatingAndRolesResponse } from './TeacherWithRatingAndRolesResponse';

export class SubjectWithTeachersResponse {
  @ApiProperty()
    subjectName: string;

  @ApiProperty({
    type: [TeacherWithRatingAndRolesResponse],
  })
    teachers: TeacherWithRatingAndRolesResponse[];

}