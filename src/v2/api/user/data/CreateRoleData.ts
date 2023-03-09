import { RoleName } from '@prisma/client';

export class CreateRoleData {
  name: RoleName;
  weight: number;
}