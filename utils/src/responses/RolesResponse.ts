import { ApiProperty } from '@nestjs/swagger';
import { PaginationDataResponse } from './PaginationDataResponse';
import { RoleResponse } from './RoleResponse';

export class RolesResponse {
    @ApiProperty({
      description: 'An array of information about the role',
      type: [RoleResponse],
    })
      data: RoleResponse[];
    
    @ApiProperty({
      description: 'Pagination properties',
    })
      pagination: PaginationDataResponse;
}