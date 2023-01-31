import { RoleName } from '@prisma/client';

export interface CreateRoleWithGrantsDTO extends CreateRoleDTO {
  grants: CreateGrantDTO[],
}

export interface CreateRoleDTO {
  name: RoleName,
  weight: number,
}

export interface CreateGrantDTO {
  permission: string,
  set?: boolean,
}

export interface CreateGrantData extends CreateGrantDTO {
  roleId: string,
}

export interface CreateGrantsDTO {
  grants: CreateGrantDTO[],
}