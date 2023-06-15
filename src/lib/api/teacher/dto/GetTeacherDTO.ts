import { ContactType } from '@/components/pages/personal-teacher-page/contacts';

export enum TeacherRoles {
  LECTURER = 'LECTURER',
  LABORANT = 'LABORANT',
  PRACTICIAN = 'PRACTICIAN',
}

export interface GetTeacherDTO {
  teacher: {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    description: string;
    avatar: string;
  };
  roles: TeacherRoles[];
  contacts: {
    link: string;
    id: string;
    name: ContactType;
    displayName: string;
  }[];
}
export interface GetTeachersDTO {
  teachers: GetTeacherDTO[];
}
