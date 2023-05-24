import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidGroupIdException } from '../../utils/exceptions/InvalidGroupIdException';
import { GroupService } from '../services/GroupService';

@Injectable()
export class GroupByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private groupRepository: GroupService
  ) {}

  async transform (groupId: string): Promise<string> {
    const group = await this.groupRepository.get(groupId);
    if (!group) {
      throw new InvalidGroupIdException();
    }
    return groupId;
  }
}