import { User, UserGroupRole } from '@/types/user';

export interface PendingStudent extends Omit<User, 'group'> {
  group: {
    id: string;
    code: string;
  };
}

export interface GroupStudent extends Omit<User, 'group'> {
  group: {
    id: string;
    code: string;
    role: UserGroupRole;
  };
}
