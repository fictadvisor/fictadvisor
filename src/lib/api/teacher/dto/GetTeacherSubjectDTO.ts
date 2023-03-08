import { ContactType } from '@/components/pages/personal-teacher-page/contacts';

export interface GetTeacherSubjectDTO {
  id: string;
  lastName: string;
  avatar: string;
  middleName: string;
  firstName: string;
  subject: {
    id: string;
    name: ContactType;
  };
  roles: ('LECTURER' | 'LABORANT' | 'PRACTICIAN')[];
  contacts: {
    link: string;
    id: string;
    name: ContactType;
    displayName: string;
  }[];
}
