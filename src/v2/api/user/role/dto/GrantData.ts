import { RoleName } from '@prisma/client';

export class Grant {
  id: string;
  permission: string;
  set: boolean;
}

export class Role {
  id: string;
  name: RoleName;
  weight: number;
  grants: Grant[];

}