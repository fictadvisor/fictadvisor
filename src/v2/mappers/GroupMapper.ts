import { Injectable } from '@nestjs/common';
import { DbGroup } from '../database/entities/DbGroup';

@Injectable()
export class GroupMapper {
  getGroup (group: DbGroup) {
    return {
      id: group.id,
      code: group.code,
    };
  }

  getGroups (groups: DbGroup[]) {
    return groups.map((group) => this.getGroup(group));
  }
}