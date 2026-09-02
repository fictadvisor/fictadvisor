import { Injectable } from '@nestjs/common';
import { CheckPermissionsDTO } from '@fictadvisor/utils/requests';
import { RoleRepository } from '../../../database/v2/repositories/role.repository';
import { DbRole } from '../../../database/v2/entities/role.entity';
import { DataNotFoundException } from '../../../common/exceptions/data-not-found.exception';
import { Grant } from '@prisma-client/fictadvisor';

@Injectable()
export class PermissionService {
  constructor (private roleRepository: RoleRepository) {}

  async hasPermission (userId: string, permission: string): Promise<boolean> {
    const roles = await this.roleRepository.findMany({
      userRoles: {
        some: {
          studentId: userId,
        },
      },
    }, {
      grants: {
        orderBy: {
          weight: 'desc',
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
      const parent = await this.roleRepository.findOne({ id: role.parentId }, {
        grants: {
          orderBy: {
            weight: 'desc',
          },
        },
      });
      await this.pushGrantsAndCheckParent(parent, grants);
    }
  }

  private findGrantMatchesPermission (permission: string, grants: Grant[]): Grant | undefined {
    return grants
      .filter((grant) => grant.permission)
      .find(({ permission: grant }) => this.isGrantMatchesPermission(permission, grant));
  }

  async hasPermissionInRoles (roles: DbRole[], permission: string): Promise<boolean> {
    const grants: Grant[] = [];

    // Sequential and awaited: `pushGrantsAndCheckParent` walks the parent chain
    // asynchronously, so firing it off unawaited left inherited grants out of the
    // array by the time we looked for a match. The first match wins, so the order
    // is the precedence — each role's own grants before the ones it inherits.
    for (const role of roles) {
      await this.pushGrantsAndCheckParent(role, grants);
    }

    const grant = this.findGrantMatchesPermission(permission, grants);
    return !!grant?.set;
  }

  async checkPermissions (userId: string, body: CheckPermissionsDTO) {
    const result = new Map<string, boolean>();

    for (const permission of body.permissions) {
      const valuesForPermission = body.values ?? {};
      const newPermission = this.getCorrectPermission(permission, valuesForPermission);
      const permissionCheckResult = await this.hasPermission(userId, newPermission);
      result.set(permission, permissionCheckResult);
    }

    return result;
  }

  private getCorrectPermission (permission: string, values: object): string {
    return permission
      .split('.')
      .map((part) => this.getPermissionPart(part, values))
      .join('.');
  }

  private getPermissionPart (part: string, values: object): string {
    if (!part.startsWith('$')) {
      return part;
    }

    const newPart = values[part.slice(1)];
    if (!newPart) {
      throw new DataNotFoundException();
    }
    return newPart;
  }
}
