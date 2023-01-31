import { Injectable, type PipeTransform } from '@nestjs/common';
import { type Group } from '@prisma/client';
import { InvalidGroupIdException } from '../../utils/exceptions/InvalidGroupIdException';
import { GroupService } from './GroupService';

@Injectable()
export class GroupByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private readonly groupService: GroupService
  ) {}

  async transform (groupId: string): Promise<string> {
    const group: Group = await this.groupService.get(groupId);
    if (!group) {
      throw new InvalidGroupIdException();
    }
    return groupId;
  }
}
