import { Injectable, PipeTransform } from '@nestjs/common';
import { GroupRepository } from '../../database/v2/repositories/GroupRepository';
import { InvalidEntityIdException } from '../exceptions/InvalidEntityIdException';

@Injectable()
export class GroupByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (private groupRepository: GroupRepository) {}

  async transform (id: string): Promise<string> {
    const group = await this.groupRepository.findOne({ id });
    if (!group) {
      throw new InvalidEntityIdException('Group');
    }
    return id;
  }
}
