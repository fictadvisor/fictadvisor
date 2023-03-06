import { ContactType } from '@/components/pages/personal-teacher-page/contacts';

export interface GetTeacherDTO {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  description: string;
  avatar: string;
  roles: ('LECTURER' | 'LABORANT' | 'PRACTICIAN')[];
  contacts: {
    link: string;
    id: string;
    name: ContactType;
    displayName: string;
  }[];
}
