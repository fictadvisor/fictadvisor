import { Contact } from '@prisma-client/fictadvisor';

export class StudentWithContactsData {
  lastName: string | null;
  firstName: string | null;
  middleName: string | null;
  email: string;
  contacts: Contact[];
}
