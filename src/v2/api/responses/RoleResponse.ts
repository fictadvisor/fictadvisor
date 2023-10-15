import { ApiProperty } from '@nestjs/swagger';
import { MappedGrant } from './GrantResponse';
import { RoleName } from '@prisma/client';

export class BaseRoleResponse {
  @ApiProperty({
    description: 'Id of a user role',
  })
    id: string;

  @ApiProperty({
    enum: RoleName,
    description: 'Type of a role',
  })
    name: RoleName;

  @ApiProperty({
    description: 'Type of a role access',
  })
    weight: number;
}

export class RoleResponse extends BaseRoleResponse {
  @ApiProperty({
    type: [MappedGrant],
    description: 'List of permissions for roles',
  })
    grants: MappedGrant[];
}

export class RolesResponse {
  @ApiProperty({
    type: [RoleResponse],
    description: 'List of users roles',
  })
    roles: RoleResponse[];
}