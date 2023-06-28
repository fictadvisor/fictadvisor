import { ApiProperty } from '@nestjs/swagger';
import { MetaDataResponse } from './MetaDataResponse';
import { SubjectCountResponse } from './SubjectCountResponse';

export class PaginatedSubjectsResponse {
  @ApiProperty({
    type: [SubjectCountResponse],
  })
    subjects: SubjectCountResponse[];
  
  @ApiProperty()
    meta: MetaDataResponse;
}