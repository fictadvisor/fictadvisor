import { Injectable } from '@nestjs/common';
import { RoleRepository } from './RoleRepository';
import { CreateGrantDTO, CreateRoleWithGrantsDTO } from '../dto/CreateRoleDTO';
import { GrantRepository } from '../grant/GrantRepository';
import { GrantService } from '../grant/GrantService';
import { UpdateRoleDTO } from './dto/UpdateRoleDTO';

@Injectable()
export class RoleService {
  constructor(
    private roleRepository: RoleRepository,
    private grantRepository: GrantRepository,
    private grantService: GrantService,
  ) {}

  async createRole({ grants, ...data }: CreateRoleWithGrantsDTO) {
    const role = await this.roleRepository.create(data);
    if (grants) {
      return {
        ...role,
        grants: await this.createGrants(role.id, grants),
      };
    }
    return role;
  }

  async createGrants(roleId: string, grants: CreateGrantDTO[]) {
    const results = [];

    for (const grant of grants) {
      const dbGrant = await this.grantRepository.create({
        ...grant,
        roleId,
      });
      results.push(dbGrant);
    }

    return results.map((grant) => {
      delete grant.roleId;
      return grant;
    });
  }

  async hasPermission(roleId: string, permission: string) {
    const grants = await this.roleRepository.getGrants(roleId);
    for (const grant of grants) {
      const hasPermission = this.grantService.hasPermission(permission, grant.permission);
      if (hasPermission) return grant.set;
    }
  }

  async delete(id: string) {
    await this.roleRepository.delete(id);
  }

  async update(id: string, body: UpdateRoleDTO) {
    await this.roleRepository.update(id, body);
  }
}