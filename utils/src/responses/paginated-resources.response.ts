import { ApiProperty } from '@nestjs/swagger';
import { PaginationDataResponse } from './pagination-data.response';
import { ResourceResponse } from './resource.response';

export class PaginatedResourcesResponse {
  @ApiProperty({
    type: [ResourceResponse],
  })
    studentResources: ResourceResponse[];
  
  @ApiProperty()
    pagination: PaginationDataResponse;
}



