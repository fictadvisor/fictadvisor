import { Injectable } from '@nestjs/common';
import {
  UpdateRoleDTO,
  CreateRoleWithGrantsDTO,
  CreateGrantDTO,
  QueryAllRolesDTO,
  CreateRoleDTO,
  QueryAllGrantsDTO,
  UpdateGrantDTO,
} from '@fictadvisor/utils/requests';
import { mapAsync } from '../../../common/helpers/arrayUtils';
import { DatabaseUtils } from '../../../database/DatabaseUtils';
import { DbRole } from '../../../database/v2/entities/DbRole';
import { PermissionService } from '../../permission/v2/PermissionService';
import { RoleRepository } from '../../../database/v2/repositories/RoleRepository';
import { GrantRepository } from '../../../database/v2/repositories/GrantRepository';
import { NoPermissionException } from '../../../common/exceptions/NoPermissionException';
import { InvalidEntityIdException } from '../../../common/exceptions/InvalidEntityIdException';
import { NotBelongException } from '../../../common/exceptions/NotBelongException';
import { Grant, Prisma } from '@prisma/client/fictadvisor';

@Injectable()
export class RoleService {
  constructor (
    public roleRepository: RoleRepository,
    public grantRepository: GrantRepository,
    public permissionService: PermissionService,
  ) {}

  async createRoleWithGrants ({ grants = [], ...data }: CreateRoleWithGrantsDTO, userId: string) {
    const userRoles = await this.getUserHigherRoles(userId, data.weight);

    await this.checkRole(userRoles, { ...data, grants });

    return this.roleRepository.create({
      ...data,
      grants: {
        create: grants,
      },
    });
  }

  async createRole (data: CreateRoleDTO) {
    return this.roleRepository.create(data);
  }

  private getUserHigherRoles (userId: string, weight: number) {
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

  delete (id: string) {
    return this.roleRepository.deleteById(id);
  }

  async update (id: string, body: UpdateRoleDTO) {
    return this.roleRepository.updateById(id, body);
  }

  get (roleId: string) {
    return this.roleRepository.findById(roleId);
  }

  async getAll (query: QueryAllRolesDTO) {
    const search = DatabaseUtils.getSearch(query, 'displayName');
    const sort = DatabaseUtils.getSort(query, 'displayName');

    const data: Prisma.RoleFindManyArgs = {
      where: {
        ...search,
        name: query.name,
        groupRole: query.groupId ? {
          groupId: query.groupId,
        } : undefined,
      },
      ...sort,
    };

    return DatabaseUtils.paginate<DbRole>(this.roleRepository, query, data);
  }

  async getAllGrants (roleId: string, query: QueryAllGrantsDTO) {
    const search = DatabaseUtils.getSearch(query, 'permission');
    const sort = DatabaseUtils.getSort(query, 'permission');

    const data: Prisma.GrantFindManyArgs = {
      where: {
        ...search,
        set: query.set,
        roleId,
      },
      ...sort,
    };

    return DatabaseUtils.paginate<Grant>(this.grantRepository, query, data);
  }

  async getGrant (roleId: string, grantId: string) {
    await this.checkGrantBelonging(roleId, grantId);
    return this.grantRepository.findById(grantId);
  }

  async createGrants (roleId: string, grants: CreateGrantDTO[]) {
    const createGrants = grants.map((g) => ({ roleId, ...g }));
    const createdGrants = await this.grantRepository.createMany(createGrants);

    await this.reorderGrants(roleId);
    return createdGrants;
  }

  async createGrant (roleId: string, body: CreateGrantDTO) {
    const grant = await this.grantRepository.create({ ...body, roleId });

    await this.reorderGrants(roleId);
    return grant;
  }

  async updateGrant (roleId: string, grantId: string, body: UpdateGrantDTO,) {
    await this.checkGrantBelonging(roleId, grantId);
    const grant = await this.grantRepository.updateById(grantId, body);

    await this.reorderGrants(roleId);
    return grant;
  }

  async deleteGrant (roleId: string, grantId: string) {
    await this.checkGrantBelonging(roleId, grantId);
    const grant = await this.grantRepository.deleteById(grantId);

    await this.reorderGrants(roleId);
    return grant;
  }

  private async checkGrantBelonging (roleId: string, grantId: string) {
    const grant = await this.grantRepository.findById(grantId);
    if (grant.roleId !== roleId) {
      throw new NotBelongException('grant', 'role');
    }
  }

  private async reorderGrants (roleId: string) {
    const grants = await this.grantRepository.findMany({
      where: { roleId },
      orderBy:
        [
          { weight: 'asc' },
          { updatedAt: 'desc' },
        ],
    });

    const toUpdate = grants.map((gr, index) => ({ ...gr, index: index + 1 }))
      .filter((gr) => gr.weight !== gr.index);

    await mapAsync(toUpdate, async (gr) => {
      await this.grantRepository.update({ id: gr.id }, { weight: gr.index });
    });
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
      throw new InvalidEntityIdException('ParentId');
    }
    if (parent.weight > role.weight) {
      throw new NoPermissionException();
    }

    await this.checkRole(userRoles, parent);
  }
}
