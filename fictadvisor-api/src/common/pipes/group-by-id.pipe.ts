import { Injectable, PipeTransform } from '@nestjs/common';
import { GroupRepository } from '../../database/v2/repositories/group.repository';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';

@Injectable()
export class GroupByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (private groupRepository: GroupRepository) {}

  async transform (id: string): Promise<string> {
    const exists = await this.groupRepository.exists({ id });
    if (!exists) {
      throw new InvalidEntityIdException('Group');
    }
    return id;
  }
}
