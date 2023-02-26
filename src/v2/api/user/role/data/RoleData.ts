import { RoleName } from '@prisma/client';
import { GrantData } from './GrantData';

export class RoleData {
  id: string;
  name: RoleName;
  weight: number;
  grants: GrantData[];

}