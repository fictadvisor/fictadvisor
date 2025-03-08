import { Injectable } from '@nestjs/common';
import { DbRole } from '../../database/v2/entities/role.entity';
import { DbGrant } from '../../database/v2/entities/grant.entity';
import {
  BaseRoleResponse,
  BaseRoleWithParentResponse,
  GrantResponse,
  RoleResponse,
  RoleWithStudentResponse,
} from '@fictadvisor/utils/responses';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { DbUserRole } from '../../database/v2/entities/user-role.entity';

@Injectable()
export class RoleProfile extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile () {
    return (mapper: Mapper) => {
      createMap(mapper, DbRole, BaseRoleResponse);
      createMap(mapper, DbRole, RoleResponse);
      createMap(mapper, DbRole, BaseRoleWithParentResponse);
      createMap(mapper, DbUserRole, RoleWithStudentResponse);
      createMap(mapper, DbGrant, GrantResponse);
    };
  }
}
