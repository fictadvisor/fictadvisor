import { ApiProperty } from '@nestjs/swagger';
import { MetaDataResponse } from './MetaDataResponse';
import { TeacherWithRatingResponse } from './TeacherWithRatingResponse';

export class PaginatedTeachersResponse {
  @ApiProperty({
    type: [TeacherWithRatingResponse],
  })
    teachers: TeacherWithRatingResponse[];
  
  @ApiProperty()
    meta: MetaDataResponse;
}