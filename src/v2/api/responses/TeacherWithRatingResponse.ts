import { ApiProperty } from '@nestjs/swagger';
import { TeacherResponse } from './TeacherResponse';

export class TeacherWithRatingResponse extends TeacherResponse {
  @ApiProperty()
    rating: number;
}