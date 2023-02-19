import { Injectable } from '@nestjs/common';
import { RoleRepository } from './RoleRepository';
import { CreateGrantDTO, CreateRoleWithGrantsDTO } from '../dto/CreateRoleDTO';
import { GrantRepository } from '../grant/GrantRepository';
import { GrantService } from '../grant/GrantService';
import { UpdateRoleDTO } from './dto/UpdateRoleDTO';
import { Grant, Role } from "./dto/GrantData";
import { StudentRepository } from "../StudentRepository";
import { NoPermissionException } from "../../../utils/exceptions/NoPermissionException";

@Injectable()
export class RoleService {
  constructor(
    private roleRepository: RoleRepository,
    private grantRepository: GrantRepository,
    private grantService: GrantService,
    private studentRepository: StudentRepository,
  ) {}

  async createRole({ grants = [], ...data }: CreateRoleWithGrantsDTO, userId: string) {
    const roles = await this.studentRepository.getRoles(userId);

    const higherRoles = roles.filter((r) => r.weight > data.weight);
    let hasPermission = this.checkPermission(higherRoles, 'roles.create');
    for (const grant of grants) {
      if (!this.checkPermission(higherRoles, grant.permission)) {
        hasPermission = false;
        break;
      }
    }

    if (!hasPermission) {
      throw new NoPermissionException();
    }

    return this.roleRepository.createWithGrants(data, grants);
  }

  checkPermission(roles: Role[], permission: string) {
    for (const role of roles) {
      const hasPermission = this.hasPermission(role.grants, permission);
      if (hasPermission) return true;
    }

    return false;
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

  getGrants(roleId: string) {
    return this.roleRepository.getGrants(roleId);
  }
}