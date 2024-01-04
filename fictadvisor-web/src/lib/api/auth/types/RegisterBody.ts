import { TelegramUser } from '@/types/telegram';

interface Student {
  groupId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  isCaptain: boolean;
}

export interface RegisterBody {
  student: Student;
  user: {
    username: string;
    email: string;
    password: string;
  };
  telegram?: TelegramUser;
}
