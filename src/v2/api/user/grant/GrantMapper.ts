import { Injectable } from '@nestjs/common';
import { Grant, Role } from '@prisma/client';

type GrantMap = Grant & {
  role: Role
}

@Injectable()
export class GrantMapper {
  update (grant: GrantMap) {
    return {
      id: grant.id,
      permission: grant.permission,
      set: grant.set,
    };
  }
  delete (grant: GrantMap) {
    return {
      id: grant.id,
      permission: grant.permission,
      set: grant.set,
    };
  }
}