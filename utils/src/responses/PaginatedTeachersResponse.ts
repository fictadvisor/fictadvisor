import { ApiProperty } from '@nestjs/swagger';
import { PaginationDataResponse } from './PaginationDataResponse';
import { TeacherWithRolesAndCathedrasResponse } from './TeacherWithRolesAndCathedrasResponse';

export class PaginatedTeachersResponse {
  @ApiProperty({
    type: [TeacherWithRolesAndCathedrasResponse],
  })
    teachers: TeacherWithRolesAndCathedrasResponse[];
  
  @ApiProperty()
    pagination: PaginationDataResponse;
}