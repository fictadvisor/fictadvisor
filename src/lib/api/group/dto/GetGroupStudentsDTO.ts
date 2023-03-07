export interface GetGroupStudentsDTO {
  students: {
    id: string;
    telegramId: number;
    username: string;
    group: {
      id: string;
      code: string;
      role: 'STUDENT' | 'CAPTAIN' | 'MODERATOR';
    };
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    avatar: string;
  }[];
}
