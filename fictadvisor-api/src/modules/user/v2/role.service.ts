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
import { mapAsync } from '../../../common/utils/array.utils';
import { PaginationUtil, PaginateArgs } from '../../../database/v2/pagination.util';
import { DatabaseUtils } from '../../../database/database.utils';
import { DbRole } from '../../../database/v2/entities/role.entity';
import { PermissionService } from '../../permission/v2/permission.service';
import { RoleRepository } from '../../../database/v2/repositories/role.repository';
import { GrantRepository } from '../../../database/v2/repositories/grant.repository';
import { NoPermissionException } from '../../../common/exceptions/no-permission.exception';
import { InvalidEntityIdException } from '../../../common/exceptions/invalid-entity-id.exception';
import { NotBelongException } from '../../../common/exceptions/not-belong.exception';
import { DbGrant } from '../../../database/v2/entities/grant.entity';

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
      userRoles: {
        some: {
          studentId: userId,
        },
      },
      weight: {
        gt: weight,
      },
    });
  }

  delete (id: string) {
    return this.roleRepository.deleteById(id);
  }

  async update (id: string, body: UpdateRoleDTO) {
    return this.roleRepository.updateById(id, body);
  }

  get (id: string) {
    return this.roleRepository.findOne({ id });
  }

  async getAll (query: QueryAllRolesDTO) {
    const search = DatabaseUtils.getSearch(query, 'displayName');
    const sort = DatabaseUtils.getSort(query, 'displayName');

    const data: PaginateArgs<'role'> = {
      where: {
        ...search,
        name: query.name,
        groupRole: query.groupId ? {
          groupId: query.groupId,
        } : undefined,
      },
      ...sort,
    };

    return PaginationUtil.paginate<'role', DbRole>(this.roleRepository, query, data);
  }

  async getAllGrants (roleId: string, query: QueryAllGrantsDTO) {
    const search = DatabaseUtils.getSearch(query, 'permission');
    const sort = DatabaseUtils.getSort(query, 'permission');

    const data: PaginateArgs<'grant'> = {
      where: {
        ...search,
        set: query.set,
        roleId,
      },
      ...sort,
    };

    return PaginationUtil.paginate<'grant', DbGrant>(this.grantRepository, query, data);
  }

  async getGrant (roleId: string, grantId: string) {
    await this.checkGrantBelonging(roleId, grantId);
    return this.grantRepository.findOne({ id: grantId });
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
    const grant = await this.grantRepository.findOne({ id: grantId });
    if (grant.roleId !== roleId) {
      throw new NotBelongException('grant', 'role');
    }
  }

  private async reorderGrants (roleId: string) {
    const grants = await this.grantRepository.findMany({ roleId }, undefined, undefined, [
      { weight: 'asc' },
      { updatedAt: 'desc' },
    ]);

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

    const parent = await this.roleRepository.findOne({ id: role.parentId });
    if (!parent) {
      throw new InvalidEntityIdException('ParentId');
    }
    if (parent.weight > role.weight) {
      throw new NoPermissionException();
    }

    await this.checkRole(userRoles, parent as CreateRoleWithGrantsDTO);
  }
}
