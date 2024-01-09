export enum RoleName {
  CAPTAIN = 'CAPTAIN',
  MODERATOR = 'MODERATOR',
  STUDENT = 'STUDENT',
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum RoleState {
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
  PENDING = 'PENDING',
}

export interface Role {
  id: string;
  name: RoleName;
  weight: number;
  displayName: string;
  grants: Grant[];
}

export interface Grant {
  id: string;
  set: boolean;
  permission: string;
  weight: number;
}
