export class StudentWithUserData {
  user: {
    id: string,
    username: string,
    email: string,
    telegramId: number,
    avatar: string,
  };
  firstName: string;
  middleName: string;
  lastName: string;
  group: {
    id: string,
    code: string,
  };
}