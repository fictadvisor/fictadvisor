import { ApiProperty } from '@nestjs/swagger';
import { ResourceResponse } from './ResourceResponse';

export class ResourcesResponse {
    @ApiProperty({
      description: 'Array of student resources',
      type: [ResourceResponse],
    })
      resources: ResourceResponse[];
}