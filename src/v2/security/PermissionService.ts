import { Injectable } from '@nestjs/common';
import { GrantData } from '../api/user/role/data/GrantData';
import { RoleData } from '../api/user/role/data/RoleData';
import { RoleRepository } from '../api/user/role/RoleRepository';

@Injectable()
export class PermissionService {
  constructor (
    private roleRepository: RoleRepository,
  ) {}

  async hasPermission (userId: string, permission: string) {
    const roles = await this.roleRepository.findMany({
      where: {
        userRoles: {
          some: {
            studentId: userId,
          },
        },
      },
    });
    return this.checkPermission(roles, permission);
  }

  hasRolePermission (grants: GrantData[], permission: string) {
    for (const grant of grants) {
      const hasPermission = this.hasGrantPermission(permission, grant.permission);
      if (hasPermission) return grant.set;
    }
  }

  hasGrantPermission (permission: string, grant: string) {
    const parts = permission.split('.');
    const grantParts = grant.split('.');

    if (grantParts.length > parts.length) return false;

    for (let i = 0; i < parts.length; i++) {
      const part = grantParts[i];
      if (!part) return false;
      if (part === '*') {
        if (i === grantParts.length - 1) return true;
        else continue;
      }
      if (part !== parts[i]) return false;
    }

    return true;
  }

  checkPermission (roles: RoleData[], permission: string) {
    for (const role of roles) {
      const hasPermission = this.hasRolePermission(role.grants, permission);
      if (hasPermission) return true;
    }

    return false;
  }
}