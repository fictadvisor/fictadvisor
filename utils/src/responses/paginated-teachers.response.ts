import { ApiProperty } from '@nestjs/swagger';
import { PaginationDataResponse } from './pagination-data.response';
import { TeacherWithRolesAndCathedrasResponse } from './teacher-with-roles-and-cathedras.response';

export class PaginatedTeachersResponse {
  @ApiProperty({
    type: [TeacherWithRolesAndCathedrasResponse],
  })
    teachers: TeacherWithRolesAndCathedrasResponse[];
  
  @ApiProperty()
    pagination: PaginationDataResponse;
}
