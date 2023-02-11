export type addByMailBody = {
  email: string;
  groupId: string;
  fullName?: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
};
