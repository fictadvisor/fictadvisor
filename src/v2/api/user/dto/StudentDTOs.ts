import { Role } from '@prisma/client';

export class StudentWithUser {
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
}

export class StudentWithUserAndRoles extends StudentWithUser {
  roles: {
    role: Role,
  };
}