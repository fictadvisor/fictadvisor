import { ApiProperty } from '@nestjs/swagger';
import { MappedGrant } from './GrantResponse';
import { RoleName } from '@prisma/client';

export class BaseRoleResponse {
  @ApiProperty()
    id: string;

  @ApiProperty({
    enum: RoleName,
  })
    name: RoleName;

  @ApiProperty()
    weight: number;
}

export class RoleResponse extends BaseRoleResponse {
  @ApiProperty({ type: [MappedGrant] })
    grants: MappedGrant[];
}

export class RolesResponse {
  @ApiProperty({ type: [RoleResponse] })
    roles: RoleResponse[];
}