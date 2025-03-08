import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GrantResponse } from './grant.response';
import { RoleName } from '../enums';
import { AutoMap } from '@automapper/classes';

export class BaseRoleResponse {
  @ApiProperty({
    description: 'The id of a role',
  })
  @AutoMap()
    id: string;

  @ApiProperty({
    description: 'The name of the role',
    enum: RoleName,
  })
  @AutoMap(() => String)
    name: RoleName;

  @ApiProperty({
    description: 'The priority or importance of the role',
  })
  @AutoMap()
    weight: number;

  @ApiProperty({
    description: 'Brief information about a specific role',
  })
  @AutoMap()
    displayName: string;
}

export class BaseRoleWithParentResponse extends BaseRoleResponse {
  @ApiPropertyOptional({
    description: 'Id of parent role',
  })
  @AutoMap()
    parentId?: string;
}

export class RoleResponse extends BaseRoleResponse {
  @ApiProperty({
    description: 'An array of permissions granted to a role',
    type: [GrantResponse],
  })
  @AutoMap(() => [GrantResponse])
    grants: GrantResponse[];
}
