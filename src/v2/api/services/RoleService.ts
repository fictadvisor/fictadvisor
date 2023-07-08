import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../../database/repositories/RoleRepository';
import { GrantRepository } from '../../database/repositories/GrantRepository';
import { UpdateRoleDTO } from '../dtos/UpdateRoleDTO';
import { NoPermissionException } from '../../utils/exceptions/NoPermissionException';
import { CreateRoleWithGrantsDTO } from '../dtos/CreateRoleWithGrantsDTO';
import { CreateGrantDTO } from '../dtos/CreateGrantsDTO';
import { PermissionService } from './PermissionService';
import { DbRole } from '../../database/entities/DbRole';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';

@Injectable()
export class RoleService {
  constructor (
    public roleRepository: RoleRepository,
    public grantRepository: GrantRepository,
    public permissionService: PermissionService,
  ) {
  }

  async createRole ({ grants = [], ...data }: CreateRoleWithGrantsDTO, userId: string) {
    const userRoles = await this.getUserHigherRoles(userId, data.weight);

    const hasCreateRolesPermission = await this.permissionService.hasPermissionInRoles(userRoles, 'roles.create');
    if (!hasCreateRolesPermission) {
      throw new NoPermissionException();
    }

    await this.checkRole(userRoles, { ...data, grants });

    return this.roleRepository.create({
      ...data,
      grants: {
        create: grants,
      },
    });
  }

  private getUserHigherRoles (userId, weight) {
    return this.roleRepository.findMany({
      where: {
        userRoles: {
          some: {
            studentId: userId,
          },
        },
        weight: {
          gt: weight,
        },
      },
    });
  }

  async createGrants (roleId: string, grants: CreateGrantDTO[]) {
    const createGrants = grants.map((g) => ({ roleId, ...g }));
    return this.grantRepository.createMany(createGrants);
  }

  delete (id: string) {
    return this.roleRepository.deleteById(id);
  }

  update (id: string, body: UpdateRoleDTO) {
    return this.roleRepository.updateById(id, body);
  }

  get (roleId: string) {
    return this.roleRepository.findById(roleId);
  }

  getAll () {
    return this.roleRepository.findMany();
  }

  async getGrants (roleId: string) {
    const role = await this.roleRepository.findById(roleId);
    return role.grants;
  }

  private async canCreateGrants (userRoles: DbRole[], grants: CreateGrantDTO[]) {
    for (const { permission } of grants) {
      const hasPermission = await this.permissionService.hasPermissionInRoles(userRoles, permission);
      if (!hasPermission) return false;
    }
    return true;
  }

  private async checkRole (userRoles: DbRole[], role: CreateRoleWithGrantsDTO) {

    const canCreateGrants = await this.canCreateGrants(userRoles, role.grants);
    if (!canCreateGrants) {
      throw new NoPermissionException();
    }

    if (!role.parentId) return;

    const parent = await this.roleRepository.findById(role.parentId);
    if (!parent) {
      throw new InvalidEntityIdException('parentId');
    }
    if (parent.weight > role.weight) {
      throw new NoPermissionException();
    }

    await this.checkRole(userRoles, parent);
  }
}
