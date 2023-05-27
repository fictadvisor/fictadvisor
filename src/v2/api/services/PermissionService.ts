import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../../database/repositories/RoleRepository';
import { DbRole } from '../../database/entities/DbRole';
import { Grant } from '@prisma/client';

@Injectable()
export class PermissionService {
  constructor (
    private roleRepository: RoleRepository,
  ) {}

  async hasPermission (userId: string, permission: string): Promise<boolean> {
    const roles = await this.roleRepository.findMany({
      where: {
        userRoles: {
          some: {
            studentId: userId,
          },
        },
      },
    });
    return this.hasPermissionInRoles(roles, permission);
  }

  isGrantMatchesPermission (permission: string, grant: string): boolean {
    const parts = permission.split('.');
    const grantParts = grant.split('.');

    if (grantParts.length > parts.length) return false;

    for (let i = 0; i < parts.length; i++) {
      const part = grantParts[i];
      if (part === '*') {
        if (i === grantParts.length - 1) {
          return true;
        }
      } else if (part !== parts[i]) {
        return false;
      }
    }

    return true;
  }

  private async pushGrantsAndCheckParent (role: DbRole, grants: Grant[]): Promise<void> {
    grants.push(...role.grants);

    if (role.parentId) {
      const parent = await this.roleRepository.findById(role.parentId);
      await this.pushGrantsAndCheckParent(parent, grants);
    }
  }

  private findGrantMatchesPermission (permission: string, grants: Grant[]): Grant {
    return grants
      .filter((grant) => grant.permission)
      .find(({ permission: grant }) => this.isGrantMatchesPermission(permission, grant));
  }

  async hasPermissionInRoles (roles: DbRole[], permission: string): Promise<boolean> {
    const grants: Grant[] = [];

    roles.forEach((role) => this.pushGrantsAndCheckParent(role, grants));

    const grant = this.findGrantMatchesPermission(permission, grants);
    return !!grant?.set;
  }
}