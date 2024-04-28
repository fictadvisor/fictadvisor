import { RoleName } from '@fictadvisor/utils/enums';

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
