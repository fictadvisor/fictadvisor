import { Injectable } from '@nestjs/common';
import { Role, Grant, GroupRole, UserRole } from '@prisma/client';

type RoleMap = Role & {
  grants: Grant[],
  userRoles: UserRole[],
  groupRole: GroupRole,
} 

@Injectable()
export class RoleMapper {
  create (role: RoleMap) {
    const grants = role.grants.map((grant) => ({
      id: grant.id,
      set: grant.set,
      permission: grant.permission,
    }));
    return {
      id: role.id,
      name: role.name,
      weight: role.weight,
      grants,
    };
  }

  delete (role: RoleMap) {
    return {
      id: role.id,
      name: role.name,
      weight: role.weight,
    };
  }

  update (role: RoleMap) {
    return {
      id: role.id,
      name: role.name,
      weight: role.weight,
    };
  }

  getRole (role: RoleMap) {
    const grants = role.grants.map((grant) => ({
      id: grant.id,
      set: grant.set,
      permission: grant.permission,
    }));
    return {
      id: role.id,
      name: role.name,
      weight: role.weight,
      grants,
    };
  }

  getAll (roles: RoleMap[]) {
    return roles.map(
      (role) => (this.getRole(role))
    );
  }

  getGrants (grants: Grant[]) {
    return grants.map(
      (grant) => ({
        id: grant.id,
        set: grant.set,
        permission: grant.permission,
      })
    );
  }
}