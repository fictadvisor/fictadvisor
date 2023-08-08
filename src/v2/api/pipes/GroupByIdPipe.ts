import { Injectable, PipeTransform } from '@nestjs/common';
import { GroupRepository } from '../../database/repositories/GroupRepository';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';

@Injectable()
export class GroupByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private groupRepository: GroupRepository,
  ) {}

  async transform (groupId: string): Promise<string> {
    const group = await this.groupRepository.findById(groupId);
    if (!group) {
      throw new InvalidEntityIdException('Group');
    }
    return groupId;
  }
}