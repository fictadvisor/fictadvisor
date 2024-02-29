import { Injectable } from '@nestjs/common';
import { DbGrant } from '../../../../types/DbGrant';

@Injectable()
export class GrantMapper {

  getMappedGrant (grant: DbGrant) {
    return {
      id: grant.id,
      permission: grant.permission,
      set: grant.set,
      weight: grant.weight,
    };
  }
}