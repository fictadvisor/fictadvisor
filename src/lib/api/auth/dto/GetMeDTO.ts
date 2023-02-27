export interface GetMeDTO {
  id: string;
  username: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  telegramId: number;
  email: string;
  group: {
    id: string;
    code: string;
  };
  avatar: string;
}
