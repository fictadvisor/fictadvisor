export interface GetMeDTO {
  id: string;
  username: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  telegramId?: number;
  group?: {
    id: string;
    code: string;
    role?: 'CAPTAIN' | 'MODERATOR' | 'STUDENT';
    state: 'APPROVED' | 'DECLINED' | 'PENDING';
  };
  avatar: string;
}
