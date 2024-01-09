import { RoleName } from '@/types/role';

export interface CreateRoleBody {
  name: RoleName;
  weight: number;
  displayName: string;
}
