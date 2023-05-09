import { Injectable } from '@nestjs/common';
import { DbGrant } from './DbGrant';

@Injectable()
export class GrantMapper {
  update (grant: DbGrant) {
    return {
      id: grant.id,
      permission: grant.permission,
      set: grant.set,
    };
  }
  delete (grant: DbGrant) {
    return {
      id: grant.id,
      permission: grant.permission,
      set: grant.set,
    };
  }
}