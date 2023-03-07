export interface VerifyStudentDTO {
  id: string;
  telegramId: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  avatar: string;
  group: {
    id: string;
    code: string;
    role: 'STUDENT' | 'CAPTAIN' | 'MODERATOR';
  };
}
