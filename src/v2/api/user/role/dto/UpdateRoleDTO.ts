import { RoleName } from '@prisma/client';

export interface UpdateRoleDTO {
  name?: RoleName,
  weight?: number,
}