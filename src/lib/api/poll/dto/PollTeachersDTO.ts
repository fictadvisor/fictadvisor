export interface PollTeachersDTO {
  teachers: {
    disciplineTeacherId: string;
    roles: ('LECTURER' | 'LABORANT' | 'PRACTICIAN')[];
    firstName: string;
    middleName: string;
    lastName: string;
    avatar: string;
    subject: {
      id: string;
      name: string;
    };
  }[];
}
