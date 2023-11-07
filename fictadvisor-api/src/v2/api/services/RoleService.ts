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
import { DatabaseUtils } from '../../database/DatabaseUtils';
import { Grant, Prisma } from '@prisma/client';
import { QueryAllRolesDTO } from '../dtos/QueryAllRolesDTO';
import { CreateRoleDTO } from '../dtos/CreateRoleDTO';
import { QueryAllGrantsDTO } from '../dtos/QueryAllGrantsDTO';
import { UpdateGrantDTO } from '../dtos/UpdateGrantDTO';

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
    const roles = await DatabaseUtils.paginate<DbRole>(this.roleRepository, query, data);

    return {
      data: roles.data,
      pagination: roles.pagination,
    };
  }

  async getGrants (roleId: string, query: QueryAllGrantsDTO) {
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
    const grants = await DatabaseUtils.paginate<Grant>(this.grantRepository, query, data);

    return {
      data: grants.data,
      pagination: grants.pagination,
    };
  }

  async createGrants (roleId: string, grants: CreateGrantDTO[]) {
    const createGrants = grants.map((g) => ({ roleId, ...g }));
    for (const grant of createGrants) {
      await this.updateHigherGrants(roleId, grant.weight);
    }

    return this.grantRepository.createMany(createGrants);
  }

  async createGrant (roleId: string, body: CreateGrantDTO) {
    const grant = { ...body, roleId };
    await this.updateHigherGrants(roleId, body.weight);

    return this.grantRepository.create(grant);
  }

  async updateGrant (roleId: string, grantId: string, body: UpdateGrantDTO) {
    await this.updateHigherGrants(roleId, body.weight);
    return this.grantRepository.updateById(grantId, body);
  }

  private async updateHigherGrants (roleId: string, weight: number) {
    const higherGrants = await this.grantRepository.findMany({
      where: {
        roleId,
        weight: {
          gte: weight,
        },
      },
      orderBy: {
        weight: 'asc',
      },
    });

    let prev = weight;
    for (let i = 0; i < higherGrants.length; i++) {
      const grant = higherGrants[i];
      if (prev !== grant.weight) break;
      grant.weight++;
      prev = grant.weight;
      await this.grantRepository.updateById(grant.id, grant);
    }
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
