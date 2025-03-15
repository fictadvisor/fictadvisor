import { ApiProperty } from '@nestjs/swagger';
import { PaginationDataResponse } from './pagination-data.response';
import { RoleResponse } from './role.response';

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
