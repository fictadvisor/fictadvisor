import { ApiProperty } from '@nestjs/swagger';
import { TeacherWithRatingResponse } from './TeacherWithRatingResponse';

export class TeachersWithRatingResponse {
  @ApiProperty({
    type: [TeacherWithRatingResponse],
  })
    teachers: TeacherWithRatingResponse[];
}