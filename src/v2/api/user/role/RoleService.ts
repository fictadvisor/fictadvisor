import { Injectable } from '@nestjs/common';
import { RoleRepository } from './RoleRepository';
import { GrantRepository } from '../grant/GrantRepository';
import { GrantService } from '../grant/GrantService';
import { UpdateRoleDTO } from './dto/UpdateRoleDTO';
import { StudentRepository } from '../StudentRepository';
import { NoPermissionException } from '../../../utils/exceptions/NoPermissionException';
import { CreateRoleWithGrantsDTO } from '../dto/CreateRoleWithGrantsDTO';
import { CreateGrantDTO } from '../dto/CreateGrantsDTO';
import { PermissionService } from '../../../security/PermissionService';

@Injectable()
export class RoleService {
  constructor (
    private roleRepository: RoleRepository,
    private grantRepository: GrantRepository,
    private grantService: GrantService,
    private studentRepository: StudentRepository,
    private permissionService: PermissionService
  ) {}

  async createRole ({ grants = [], ...data }: CreateRoleWithGrantsDTO, userId: string) {
    const roles = await this.studentRepository.getRoles(userId);

    const higherRoles = roles.filter((r) => r.weight > data.weight);
    let hasPermission = this.permissionService.checkPermission(higherRoles, 'roles.create');
    for (const grant of grants) {
      if (!this.permissionService.checkPermission(higherRoles, grant.permission)) {
        hasPermission = false;
        break;
      }
    }

    if (!hasPermission) {
      throw new NoPermissionException();
    }

    return this.roleRepository.createWithGrants(data, grants);
  }

  async createGrants (roleId: string, grants: CreateGrantDTO[]) {
    const createGrants = grants.map((g) => ({ roleId, ...g }));
    return this.grantRepository.createMany(createGrants);
  }

  async delete (id: string) {
    await this.roleRepository.delete({ id });
  }

  async update (id: string, body: UpdateRoleDTO) {
    await this.roleRepository.update(id, body);
  }

  get (roleId: string) {
    return this.roleRepository.get(roleId);
  }

  getAll () {
    return this.roleRepository.getAll();
  }

  getGrants (roleId: string) {
    return this.roleRepository.getGrants(roleId);
  }
}