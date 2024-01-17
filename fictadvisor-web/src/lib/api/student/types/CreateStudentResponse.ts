import { UserGroupState } from '@/types/user';

export interface CreateStudentResponse {
  avatar: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  id: string;
  username: string;
  telegramId: number;
  state: UserGroupState;
  group: {
    id: string;
    code: string;
    role: string;
    state: string;
  };
}
