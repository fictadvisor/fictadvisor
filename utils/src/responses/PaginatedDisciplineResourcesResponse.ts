import { ApiProperty } from '@nestjs/swagger';
import { DisciplineResourceResponse } from './DisciplineResourceResponse';
import { PaginationDataResponse } from './PaginationDataResponse';

export class PaginatedDisciplineResourcesResponse {
  @ApiProperty({
    type: [DisciplineResourceResponse],
  })
    disciplineResources: DisciplineResourceResponse[];
  
  @ApiProperty({
    type: PaginationDataResponse,
  })
    pagination: PaginationDataResponse;
}