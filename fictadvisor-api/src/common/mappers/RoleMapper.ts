import { Injectable } from '@nestjs/common';
import { Grant } from '@prisma/client/fictadvisor';
import { DbRole } from '../../database/v2/entities/DbRole';
import { DbGrant } from '../../database/v2/entities/DbGrant';
import {
  BaseRoleResponse,
  GrantResponse,
  RoleResponse,
} from '@fictadvisor/utils/responses';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';

@Injectable()
export class RoleMapper extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile () {
    return (mapper: Mapper) => {
      createMap(mapper, DbRole, BaseRoleResponse);
      createMap(mapper, DbRole, RoleResponse);
      createMap(mapper, DbGrant, GrantResponse);
    };
  }

  getBaseRole (role: DbRole): BaseRoleResponse {
    return this.mapper.map(role, DbRole, BaseRoleResponse);
  }

  getRole (role: DbRole): RoleResponse {
    return this.mapper.map(role, DbRole, RoleResponse);
  }

  getRoles (roles: DbRole[]): RoleResponse[] {
    return this.mapper.mapArray(roles, DbRole, RoleResponse);
  }

  getGrant (grant: DbGrant): GrantResponse {
    return this.mapper.map(grant, DbGrant, GrantResponse);
  }

  getGrants (grants: Grant[]): GrantResponse[] {
    return this.mapper.mapArray(grants, DbGrant, GrantResponse);
  }
}
