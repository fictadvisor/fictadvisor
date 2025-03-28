import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';
import { RoleRepository } from '../../database/v2/repositories/role.repository';

@Injectable()
export class RoleByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private roleRepository: RoleRepository,
  ) {}

  async transform (id: string): Promise<string> {
    const role = await this.roleRepository.findOne({ id });
    if (!role) {
      throw new InvalidEntityIdException('Role');
    }
    return id;
  }
}
