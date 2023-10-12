import { Injectable } from '@nestjs/common';
import { Grant } from '@prisma/client';
import { DbRole } from '../database/entities/DbRole';
@Injectable()
export class RoleMapper {
  create (role: DbRole) {
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
      displayName: role.displayName,
    };
  }

  delete (role: DbRole) {
    return {
      id: role.id,
      name: role.name,
      weight: role.weight,
      displayName: role.displayName,
    };
  }

  update (role: DbRole) {
    return {
      id: role.id,
      name: role.name,
      weight: role.weight,
      displayName: role.displayName,
    };
  }

  getRole (role: DbRole) {
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
      displayName: role.displayName,
    };
  }

  getAll (roles: DbRole[]) {
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
