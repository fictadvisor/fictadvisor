import { ApiProperty } from '@nestjs/swagger';
import { MetaDataResponse } from './MetaDataResponse';
import { TeacherResponse } from './TeacherResponse';

export class PaginatedTeachersResponse {
  @ApiProperty({
    type: [TeacherResponse],
  })
    teachers: TeacherResponse[];
  
  @ApiProperty()
    meta: MetaDataResponse;
}