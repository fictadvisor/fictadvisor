import { type State } from '@prisma/client';

export class CreateStudentData {
  userId: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  groupId: string;
  state?: State;
}
