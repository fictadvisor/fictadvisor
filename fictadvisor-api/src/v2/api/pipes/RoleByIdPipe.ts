import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
import { RoleRepository } from '../../database/repositories/RoleRepository';

@Injectable()
export class RoleByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private roleRepository: RoleRepository,
  ) {}

  async transform (roleId: string): Promise<string> {
    const role = await this.roleRepository.findById(roleId);
    if (!role) {
      throw new InvalidEntityIdException('Role');
    }
    return roleId;
  }
}
