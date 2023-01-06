import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { Group } from '@prisma/client';
import { InvalidGroupIdException } from '../../utils/exceptions/InvalidGroupIdException';
import { GroupService } from './GroupService';

@Injectable()
export class GroupByIdPipe implements PipeTransform<string, Promise<Group>> {
  constructor(
    private groupService: GroupService
  ) {}

  async transform(value: string, metadata: ArgumentMetadata) {
    const group: Group = await this.groupService.get(value);
    if(!group) {
      throw new InvalidGroupIdException();
    }
    return group;
  }
}