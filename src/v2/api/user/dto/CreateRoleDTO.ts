import { RoleName } from '@prisma/client';

export class CreateRoleDTO {
  name: RoleName;
  weight: number;
}

export class CreateRoleData {
  name: RoleName;
  weight: number;
}

export class CreateRoleWithGrantsDTO extends CreateRoleDTO {
  grants: CreateGrantDTO[];
}

export class CreateGrantDTO {
  permission: string;
  set?: boolean;
}

export class CreateGrantInRoleData {
  permission: string;
  set?: boolean;
}

export class CreateGrantData extends CreateGrantInRoleData {
  roleId: string;
}

export class CreateGrantsDTO {
  grants: CreateGrantDTO[];
}