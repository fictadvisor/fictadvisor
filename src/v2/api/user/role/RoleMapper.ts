import { Injectable } from '@nestjs/common';
import { Grant } from '@prisma/client';
import { DbRole } from './DbRole';
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
    };
  }

  delete (role: DbRole) {
    return {
      id: role.id,
      name: role.name,
      weight: role.weight,
    };
  }

  update (role: DbRole) {
    return {
      id: role.id,
      name: role.name,
      weight: role.weight,
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