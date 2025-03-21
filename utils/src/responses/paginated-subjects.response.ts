import { ApiProperty } from '@nestjs/swagger';
import { PaginationDataResponse } from './pagination-data.response';
import { SubjectCountResponse } from './subject-count.response';

export class PaginatedSubjectsResponse {
  @ApiProperty({
    type: [SubjectCountResponse],
  })
    subjects: SubjectCountResponse[];
  
  @ApiProperty()
    pagination: PaginationDataResponse;
}
