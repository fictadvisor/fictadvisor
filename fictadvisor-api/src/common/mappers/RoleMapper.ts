import { Injectable } from '@nestjs/common';
import { Grant } from '@prisma/client/fictadvisor';
import { DbRole } from '../../database/v2/entities/DbRole';
import { DbGrant } from '../../database/v2/entities/DbGrant';
import {
  BaseRoleResponse,
  GrantResponse,
  RoleResponse,
} from '@fictadvisor/utils/responses';

@Injectable()
export class RoleMapper {
  getBaseRole (role: DbRole): BaseRoleResponse {
    return {
      id: role.id,
      name: role.name,
      weight: role.weight,
      displayName: role.displayName,
    };
  }

  getRole (role: DbRole): RoleResponse {
    return {
      ...this.getBaseRole(role),
      grants: this.getGrants(role.grants),
    };
  }

  getRoles (roles: DbRole[]): RoleResponse[] {
    return roles.map((role) => this.getRole(role));
  }

  getGrant (grant: DbGrant): GrantResponse {
    return {
      id: grant.id,
      permission: grant.permission,
      set: grant.set,
      weight: grant.weight,
    };
  }

  getGrants (grants: Grant[]): GrantResponse[] {
    return grants.map(this.getGrant);
  }
}
