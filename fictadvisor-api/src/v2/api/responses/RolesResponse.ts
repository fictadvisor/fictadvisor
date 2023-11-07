import { PaginationDataResponse } from './PaginationDataResponse';
import { ApiProperty } from '@nestjs/swagger';
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