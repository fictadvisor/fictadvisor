import { Injectable } from '@nestjs/common';
import { RoleRepository } from './RoleRepository';
import { CreateGrantDTO, CreateRoleWithGrantsDTO } from '../dto/CreateRoleDTO';
import { GrantRepository } from '../grant/GrantRepository';
import { GrantService } from '../grant/GrantService';
import { UpdateRoleDTO } from './dto/UpdateRoleDTO';
import { Grant } from "./dto/GrantData";

@Injectable()
export class RoleService {
  constructor(
    private roleRepository: RoleRepository,
    private grantRepository: GrantRepository,
    private grantService: GrantService,
  ) {}

  async createRole({ grants = [], ...data }: CreateRoleWithGrantsDTO) {
    return this.roleRepository.createWithGrants(data, grants);
  }

  async createGrants(roleId: string, grants: CreateGrantDTO[]) {
    const createGrants = grants.map((g) => ({ roleId, ...g }));
    return this.grantRepository.createMany(createGrants);
  }

  async hasPermission(grants: Grant[], permission: string) {
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

  get(roleId: string) {
    return this.roleRepository.get(roleId);
  }

  getAll() {
    return this.roleRepository.getAll();
  }
}