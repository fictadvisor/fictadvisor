import { Contact } from '@prisma/client';

export class StudentWithContactsData {
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  contacts: Contact[];
}