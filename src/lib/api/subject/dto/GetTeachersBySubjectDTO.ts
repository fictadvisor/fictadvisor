export interface GetTeachersBySubjectDTO {
  subjectName: string;
  teachers: {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    avatar: string;
    roles: ('LECTURER' | 'LABORANT' | 'PRACTICIAN')[];
  }[];
}
