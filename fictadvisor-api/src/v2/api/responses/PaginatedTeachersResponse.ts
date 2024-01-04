import { ApiProperty } from '@nestjs/swagger';
import { PaginationDataResponse } from './PaginationDataResponse';
import { TeacherWithCathedrasResponse } from './TeacherResponse';

export class PaginatedTeachersResponse {
  @ApiProperty({
    type: [TeacherWithCathedrasResponse],
  })
    teachers: TeacherWithCathedrasResponse[];
  
  @ApiProperty()
    pagination: PaginationDataResponse;
}