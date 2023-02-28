export interface Student {
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
}

export interface Request {
  id: string;
  telegramId: number;
  username: string;
  group: {
    id: string;
    code: string;
  };
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  avatar: string;
}

export interface AccountStore {
  students: Student[];
  requests: Request[];
}

export interface SetStudentsAction {
  students: Student[];
}

export interface SetRequestsAction {
  requests: Request[];
}
