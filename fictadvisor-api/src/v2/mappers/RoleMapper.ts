import { Injectable } from '@nestjs/common';
import { Grant } from '@prisma/client';
import { DbRole } from '../database/entities/DbRole';
@Injectable()
export class RoleMapper {
  create (role: DbRole) {
    return {
      id: role.id,
      name: role.name,
      weight: role.weight,
      displayName: role.displayName,
    };
  }
  createWithGrants (role: DbRole) {
    const grants = role.grants.map((grant) => ({
      id: grant.id,
      set: grant.set,
      weight: grant.weight,
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
      permission: grant.permission,
      weight: grant.weight,
      set: grant.set,
    }));
    return {
      id: role.id,
      displayName: role.displayName,
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
        permission: grant.permission,
        weight: grant.weight,
        set: grant.set,
      })
    );
  }
}
