export interface GetRequestDTO {
  students: {
    id: string;
    telegramId: number;
    username: string;
    email: string;
    firstName: string;
    middleName: string;
    lastName: string;
    avatar: string;
    group: {
      id: string;
      code: string;
    };
  }[];
}
