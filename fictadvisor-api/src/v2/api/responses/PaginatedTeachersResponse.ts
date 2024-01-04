import { ApiProperty } from '@nestjs/swagger';
import { PaginationDataResponse } from './PaginationDataResponse';
import { TeacherResponse } from './TeacherResponse';

export class PaginatedTeachersResponse {
  @ApiProperty({
    type: [TeacherResponse],
  })
    teachers: TeacherResponse[];
  
  @ApiProperty()
    pagination: PaginationDataResponse;
}