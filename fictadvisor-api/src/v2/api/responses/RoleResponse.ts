import { ApiProperty } from '@nestjs/swagger';
import { MappedGrant } from './GrantResponse';
import { RoleName } from '@prisma/client';

export class BaseRoleResponse {
  @ApiProperty({
    description: 'The id of a role',
  })
    id: string;

  @ApiProperty({
    description: 'The name of the role',
    enum: RoleName,
  })
    name: RoleName;

  @ApiProperty({
    description: 'The priority or importance of the role',
  })
    weight: number;

  @ApiProperty({
    description: 'Brief information about a specific role',
  })
    displayName: string;
}

export class RoleResponse extends BaseRoleResponse {
  @ApiProperty({
    description: 'An array of permissions granted to a role',
    type: [MappedGrant],
  })
    grants: MappedGrant[];
}

export class RolesResponse {
  @ApiProperty({
    description: 'An array of information about the role',
    type: [RoleResponse],
  })
    roles: RoleResponse[];
}