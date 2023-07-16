import { ApiProperty } from '@nestjs/swagger';
import { PaginationDataResponse } from './PaginationDataResponse';
import { SubjectCountResponse } from './SubjectCountResponse';

export class PaginatedSubjectsResponse {
  @ApiProperty({
    type: [SubjectCountResponse],
  })
    subjects: SubjectCountResponse[];
  
  @ApiProperty()
    pagination: PaginationDataResponse;
}