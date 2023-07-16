import { ApiProperty } from '@nestjs/swagger';
import { PaginationDataResponse } from './PaginationDataResponse';
import { ResourceResponse } from './ResourceResponse';

export class PaginatedResourcesResponse {
  @ApiProperty({
    type: [ResourceResponse],
  })
    studentResources: ResourceResponse[];
  
  @ApiProperty()
    pagination: PaginationDataResponse;
}



