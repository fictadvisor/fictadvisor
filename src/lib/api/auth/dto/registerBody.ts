export type registerBody = {
  student?: {
    groupId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    isCaptain: boolean;
  };
  user: {
    username: string;
    email: string;
    password: string;
  };
  telegram?: {
    auth_date: number;
    first_name: string;
    hash: string;
    id: number;
    last_name: string;
    photo_url: string;
    username: string;
  };
};
